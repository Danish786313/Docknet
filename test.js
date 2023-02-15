const path = require("path")
const fs = require("fs")

fs.readFileSync(path.join(__dirname, "./city.txt"), 'utf-8').split('\n').forEach(line => {
    console.log(line)
    // if (line.length > 0) {
    //   queryInterface.bulkInsert('cities', [{
    //     cityName: line
    //   }], {})
    // }
  })