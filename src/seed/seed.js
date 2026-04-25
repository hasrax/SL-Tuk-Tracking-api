const mongoose = require("mongoose");
const { connectDb } = require("../config/db");
const { hashPassword } = require("../utils/password");

const Province = require("../models/province.model");
const District = require("../models/district.model");
const Station = require("../models/station.model");
const TukTuk = require("../models/tuktuk.model");
const Device = require("../models/device.model");
const LocationPing = require("../models/locationPing.model");
const User = require("../models/user.model");

const { provinces, districts, stations, districtCoords } = require("./masterData");

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOffset() {
 
  const latOffset = (Math.random() - 0.5) * 0.03;
  const lngOffset = (Math.random() - 0.5) * 0.03;
  return { latOffset, lngOffset };
}

function generateDailyTimes(date, count) {
  
  const weightedHours = [
    6, 7, 8, 8, 9,
    10, 11, 12,
    16, 17, 17, 18, 19, 20,
    13, 14, 15
  ];

  const times = [];
  for (let i = 0; i < count; i++) {
    const hour = weightedHours[randBetween(0, weightedHours.length - 1)];
    const minute = randBetween(0, 59);
    const second = randBetween(0, 59);
    const t = new Date(date);
    t.setHours(hour, minute, second, 0);
    times.push(t);
  }

  // sort for realistic time flow
  times.sort((a, b) => a - b);
  return times;
}

async function seed() {
  try {
    await connectDb();

    
    await LocationPing.deleteMany({});
    await Device.deleteMany({});
    await TukTuk.deleteMany({});
    await Station.deleteMany({});
    await District.deleteMany({});
    await Province.deleteMany({});
    await User.deleteMany({});

    
    const provinceDocs = await Province.insertMany(provinces);
    const provinceMap = new Map(provinceDocs.map((p) => [p.code, p._id]));

    
    const districtDocs = await District.insertMany(
      districts.map((d) => ({
        code: d.code,
        name: d.name,
        province: provinceMap.get(d.provinceCode)
      }))
    );
    const districtMap = new Map(districtDocs.map((d) => [d.code, d._id]));

   
    const stationDocs = await Station.insertMany(
      stations.map((s) => ({
        code: s.code,
        name: s.name,
        district: districtMap.get(s.districtCode)
      }))
    );

   
    const adminPassword = "Admin123!";
    const admin = await User.create({
      fullName: "HQ Admin",
      email: "admin@police.lk",
      passwordHash: await hashPassword(adminPassword),
      role: "HQ_ADMIN",
      isActive: true
    });

    
    const tuktuks = [];
    const devices = [];

    for (let i = 1; i <= 200; i++) {
      const district = districtDocs[randBetween(0, districtDocs.length - 1)];
      const stationOptions = stationDocs.filter(
        (st) => st.district.toString() === district._id.toString()
      );
      const station = stationOptions[randBetween(0, stationOptions.length - 1)];

      const regNo = `TT-${String(i).padStart(4, "0")}`;

      const tuktuk = await TukTuk.create({
        regNo,
        displayName: `TukTuk ${regNo}`,
        province: district.province,
        district: district._id,
        station: station._id,
        isActive: true
      });
      tuktuks.push(tuktuk);

      const deviceId = `DEV-${String(i).padStart(4, "0")}`;
      const deviceSecret = `dev-${String(i).padStart(4, "0")}-secret`;
      const device = await Device.create({
        deviceId,
        tuktuk: tuktuk._id,
        secretHash: await hashPassword(deviceSecret),
        isActive: true,
        lastSeenAt: new Date()
      });
      devices.push(device);
    }

    
    const pings = [];
    const days = 14;

    for (let i = 0; i < tuktuks.length; i++) {
      const tuktuk = tuktuks[i];
      const device = devices[i];

      const districtDoc = districtDocs.find((d) => d._id.equals(tuktuk.district));
      const coords = districtCoords[districtDoc.code] || { lat: 7.0, lng: 80.0 };

      for (let d = 0; d < days; d++) {
        const day = new Date();
        day.setDate(day.getDate() - d);
        day.setHours(0, 0, 0, 0);

        const count = randBetween(30, 40);
        const times = generateDailyTimes(day, count);

        for (const t of times) {
          const { latOffset, lngOffset } = randomOffset();

          pings.push({
            tuktuk: tuktuk._id,
            device: device._id,
            lat: coords.lat + latOffset,
            lng: coords.lng + lngOffset,
            pingedAt: t
          });
        }
      }
    }

    
    const chunkSize = 5000;
    for (let i = 0; i < pings.length; i += chunkSize) {
      const chunk = pings.slice(i, i + chunkSize);
      await LocationPing.insertMany(chunk);
    }

    console.log("✅ Seed complete");
    console.log("Admin login -> email: admin@police.lk / password: Admin123!");
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await mongoose.connection.close();
  }
}

seed();