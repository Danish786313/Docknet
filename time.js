// const launchDate = new Date('July 1, 1999, 12:00:00');
// console.log(launchDate)
// const futureDate = new Date();
// futureDate.setTime(launchDate.getTime());

// console.log(futureDate);
// // Expected output: "Thu Jul 01 1999 12:00:00 GMT+0200 (CEST)"

// const fiveMinutesInMillis = 45 * 60 * 1000;
// console.log(futureDate.getTime(), "ye")
// futureDate.setTime(futureDate.getTime() /* + fiveMinutesInMillis */);

// console.log(futureDate);
// // Expected output: "Thu Jul 01 1999 12:05:00 GMT+0200 (CEST)"
// Note: your timezone may vary

// let obj2 = new Date(obj)
// const fiveMinutessInMillis = 01 * 60 * 1000;
// let newdate = obj2.getTime() + fiveMinutesInMillis
// console.log(
    
    
     // let time2 = req.body.morning_end.split(":")
    // let end = moment({hour :time2[0], minute :time2[1]})

//   console.log(end)
 
//   console.log(end == start)
//   console.log(start.isAfter(end))

//     // console.log(end, "end")
//     let slots
//     while (true) {

//         obj.add(parseInt(req.body.slots), 'minute')
//         if (slots <= end) {
//             break
//         }
//     }
    

//    console.log(slots)
//    let slots2 = obj.add(parseInt(req.body.slots), 'minute')
//    console.log(slots2)Date())


//    while (true) {
//     if (slots.isAfter(req.body.morning_end)) {
//         break
//     }
//     slots = slots.add(parseInt(req.body.slots),'minute')
//     console.log(slots)
//    }




Bath
Birmingham
Bradford
Brighton & Hove
Bristol
Cambridge
Canterbury
Carlisle
Chelmsford
Chester
Chichester
Colchester
Coventry
Derby
Doncaster
Durham
Ely
Exeter
Gloucester
Hereford
Kingston-upon-Hull
Lancaster
Leeds
Leicester
Lichfield
Lincoln
Liverpool
London
Manchester
Milton Keynes
Newcastle-upon-Tyne
Norwich
Nottingham
Oxford
Peterborough
Plymouth
Portsmouth
Preston
Ripon
Salford
Salisbury
Sheffield
Southampton
Southend-on-Sea
St Albans
Stoke on Trent
Sunderland
Truro
Wakefield
Wells
Westminster
Winchester
Wolverhampton
Worcester
York

Armagh
Bangor
Belfast
Lisburn
Londonderry
Newry

Aberdeen
Dundee
Dunfermline
Edinburgh
Glasgow
Inverness
Perth
Stirling

Bangor
Cardiff
Newport
St Asaph
St Davids
Swansea
Wrexham

Douglas

Hamilton

City of Gibraltar
Stanley

Jamestown


SELECT `patient`.`id`, `patient`.`name`, `patient`.`profilePicture`, `patient`.`phone`, `patient`.`DOB`, `patient`.`gender`, `patient`.`email`,
`patient`.`password`, `patient`.`reset_password`, `patient`.`otp`, `patient`.`isVerified`, `patient`.`parent_id`,
 `patient`.`createdAt`, `patient`.`updatedAt`, `patient`.`patient_id`, 
`child`.`id` AS `child.id`, `child`.`name` AS `child.name`, `child`.`profilePicture` AS `child.profilePicture`,
 `child`.`phone` AS `child.phone`,
`child`.`DOB` AS `child.DOB`, `child`.`gender` AS `child.gender`, `child`.`email` AS `child.email`,
 `child`.`password` AS `child.password`, `child`.`reset_password`
AS `child.reset_password`, `child`.`otp` AS `child.otp`, `child`.`isVerified` AS 
`child.isVerified`, `child`.`parent_id` AS `child.parent_id`, `child`.`createdAt` AS
 `child.createdAt`, `child`.`updatedAt` AS `child.updatedAt`, `child`.`patient_id` AS 
 `child.patient_id` FROM `patients` AS `patient` LEFT OUTER JOIN `patients` AS `child` ON `patient`.`id` = `child`.`patient_id`;