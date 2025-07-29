// console.log("Hello world")

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

//  schema
const dataSchema = new mongoose.Schema({
  name: String,
  description: String,
  published_date: Date,
  phone: String
});

const Data = mongoose.model("Data", dataSchema);
export default Data;

//  Connect to MongoDB
mongoose.connect("mongodb+srv://balajiborude2503:Bq0aYqCKFPvj7BOb@cluster0.wtinlxo.mongodb.net/dummyData")
.then(() => {
  console.log("MongoDB connected succesfullly");
})

.catch(err => console.error(" Erro in Db connection", err));

function getISTDate() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; 
  return new Date(now.getTime() + istOffset);
}

async function InsertData() {

    // const deleted_data = await Data.deleteMany();
    // console.log("deleted Data", deleted_data)
  try {
        const dummyData = [];

        for (let i = 0; i<50; i++) {
        dummyData.push({
            name: faker.person.fullName(),
            description: faker.lorem.sentence(),
            published_date: getISTDate(),
            phone: faker.phone.number('+91-##########')
        });
        }

        await Data.insertMany(dummyData);
        console.log("Dummy data inserted");

    } catch (err) {
        console.error(" Error while Inserting the data ", err);
        process.exit(1);

  }
}

InsertData()
