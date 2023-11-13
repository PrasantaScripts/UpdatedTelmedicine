const asyncHandler = require("express-async-handler");
const Family = require("../model/familySchema");
const CsvParser = require("json2csv").Parser;

const registerFamily = asyncHandler(async (req, res) => {
  var {
    mainName,
    mobile,
    address,
    date,
    locationCode,
    members,
    education,
    familyIncome,
    maritalStatus,
  } = req.body;
  if (
    !mainName ||
    !mobile ||
    !address ||
    !date ||
    !locationCode ||
    !education ||
    !familyIncome ||
    !maritalStatus
  ) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  var number = 0;
  const familyList = await Family.find({ date: date });
  count = familyList.length;
  if (count + 1 < 10) {
    number = "000" + (count + 1);
  } else if (count + 1 < 100) {
    number = "00" + (count + 1);
  } else if (count + 1 < 1000) {
    number = "0" + (count + 1);
  } else {
    number = count + 1 + "";
  }
  var today = new Date();
  var monthNo;
  if (today.getMonth() + 1 < 10) {
    monthNo = "0" + (today.getMonth() + 1);
  } else {
    monthNo = today.getMonth() + 1 + "";
  }
  var day;
  if (today.getDate() < 10) {
    day = "0" + today.getDate();
  } else {
    day = today.getDate() + "";
  }
  const id =
    locationCode + monthNo + day + (today.getFullYear() % 100) + number;

  var memberArr = [];
  members.map((item, idx) => {
    var data = {
      name: item.name,
      relationship: item.relationship,
      id: id + "0" + (idx + 1),
    };
    memberArr.push(data);
  });

  members = [...memberArr];

  const name = mainName;

  const family = await Family.create({
    name,
    mobile,
    address,
    date,
    locationCode,
    members,
    education,
    familyIncome,
    maritalStatus,
    id,
  });

  if (family) {
    res.status(201).json({
      id: family.id,
    });
  } else {
    res.status(400);
    throw new Error("failed to create a hw");
  }
});

const fetchFamily = asyncHandler(async (req, res) => {
  const { input, searchType } = req.body;
  var family;
  if (searchType === "Mobile Number")
    family = await Family.findOne({ mobile: input });
  else family = await Family.findOne({ id: input });

  console.log(family);

  if (family) {
    res.status(201).json({
      _id: family._id,
      name: family.name,
      address: family.address,
      date: family.date,
      mobile: family.mobile,
      locationCode: family.locationCode,
      members: family.members,
      education: family.education,
      familyIncome: family.familyIncome,
      maritalStatus: family.maritalStatus,
      id: family.id,
    });
  } else {
    res.status(400);
    throw new Error("not Found");
  }
});

const fetchTotalFamily = asyncHandler(async (req, res) => {
  const count = await Family.countDocuments({});
  if (count) {
    res.status(201).json({
      count: count,
    });
  } else {
    res.status(400);
    throw new Error("check your internet");
  }
});

// const exportTotalFamily = asyncHandler(async (req, res) => {
//   try {
//     let users = [];

//     var userData = await Family.find({});
//     userData.forEach((user) => {
//       const { name, mobile, date, members } = user;
//       //   const familyArray = nestedData
//       // .map((item) => {
//       //   return `${item.name}: ${item.id}`;
//       // })
//       // .join("; ");

//       const memberInfo = members
//         .map((member) => {
//           return `${member.name} (${member.id})`;
//         })
//         .join(", ");

//       //   let membersObj = {}
//       //   for (i = 0; i < members.length; i++) {
//       //     users.push({user:members[i].name, id:members[i].id});

//       //   }

//       //   membersObj.push(name, mobile, date, education)
//       //   console.log(membersObj)

//       users.push({ name, mobile, date, members: memberInfo });
//       console.log(users);
//       // users.push({ name, mobile, date, education,});

//       // users.push(membersObj)
//     });

//     const csvFields = ["NAME", "MOBILE", "DATE", "MEMBERS"];
//     const csvParser = new CsvParser({ csvFields });
//     const csvData = csvParser.parse(users);

//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader("Content-Disposition", "attatchment:FamilyData.csv");
//     res.status(200).end(csvData);
//   } catch (error) {
//     res.send({ status: 400, success: false, msg: error.message });
//   }
// });

const exportTotalFamily = asyncHandler(async (req, res) => {
  try {
    let users = [];

    let userData = await Family.find({});
    userData.forEach((user) => {
      const { name, mobile, date, members } = user;

      // Create an object to store family details
      const familyDetails = {
        CWE_NAME: name,
        CONTACT: mobile,
        DATE: date,
      };

      // Add a column for each member
      members.forEach((member, index) => {
        familyDetails[`MEMBER_${index + 1}_NAME`] = member.name;
        familyDetails[`MEMBER_${index + 1}_ID`] = member.id;
      });

      users.push(familyDetails);
    });

    const csvFields = ["CWE_NAME", "CONTACT", "DATE"];

    // Add column headers for members dynamically
    userData[0].members.forEach((_, index) => {
      csvFields.push(`MEMBER_${index + 1}_NAME`, `MEMBER_${index + 1}_ID`);
    });

    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=FamilyData.csv");
    res.status(200).end(csvData);
  } catch (error) {
    res.status(400).json({ status: 400, success: false, msg: error.message });
  }
});

module.exports = {
  registerFamily,
  fetchFamily,
  fetchTotalFamily,
  exportTotalFamily,
};
