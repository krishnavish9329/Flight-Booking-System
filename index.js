const express = require("express");
const mysql = require("mysql");
const path = require('path');
const bodyParser = require("body-parser");

const port = 5000;

const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "1234",
    database: "flight_database",
    port: "3306"
})

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'wedPage')));


//-----------------API-----------------------

app.get("/Home", (request, response) => {
    response.sendFile(__dirname + '/wedPage/home.html');
});

//-------------Booking----------------------------

app.get('/Booking', (request, response) => {
    response.sendFile(__dirname + "/wedPage/search.html");
})
app.post('/Booking', (request, response) => { 
    let Departure = request.body.to;
    let destination = request.body.from;
    let date = request.body.date;
    let time = request.body.time;
    let Class = request.body.class;
    let to_parson = request.body.to_parson;
    console.log(Departure + " " + destination + " " + date + " " + time + " " + Class);

    con.connect((error) => {
        if (error) console.log(error);

        let sql = `SELECT * FROM Flight where Departure LIKE '%${Departure}%' AND destination LIKE '%${destination}%' AND date LIKE '%${date}%' AND class LIKE '%${Class}%' `;

        con.query(sql, (err, result) => {
            try {
                if (err) throw err;
                //console.log(result);
                response.render(__dirname + "/wedPage/result", { data: result });
            }
            catch (e) {
                console.log(e);
                response.write("<h1>Some thing error</h1>");
            }
        })
    })
})

app.get('/Booking/AddTicket', (request, response) => {
    let FNumber = request.query.FNumber;
    let FName = request.query.FName;
    let Departure = request.query.Departure;
    let destination = request.query.destination;
    let Date1 = new Date(request.query.date);
    let date = Date1.toISOString();
    let class1= request.query.class;
    let data = [FNumber,FName,Departure, destination, date, class1];
    console.log(data)
    response.render(__dirname + '/wedPage/UserBooking', { data: data });
})

app.post('/Booking/AddTicket', (request, response) => {
    let FNumber = request.body.FNumber;
    let FName = request.body.FName;
    let Departure = request.body.Departure;
    let destination = request.body.destination;
    let date = request.body.date; 
    let class1= request.body.class;
    let NumberOfParson = request.body.NumberOfParson;
    let Names = request.body.Names;
    let Gmail = request.body.Gmail;
    let Password = request.body.Password;
    let data = [FNumber,FName,Departure, destination, date, class1,NumberOfParson,Names ,Gmail,Password];

    con.connect((error) => {
        if (error) console.log(error);

        let sql = `INSERT INTO customer (FNumber,FName,Departure,destination,date,class,NumberOfParson,Names,Gmail,Password) VALUES(?,?,?,?,?,?,?,?,?,?)`;

        con.query(sql, [FNumber,FName,Departure, destination, date, class1,NumberOfParson,Names ,Gmail,Password], (err, result) => {
            try {
                if (err) throw err;
                response.redirect(`/Booking/AddTicket/UserShowData`)
            }
            catch (e) {
                console.log(e);
                response.write("<h1>Some thing error</h1>");
            }
        })
    })

})
app.get('/Booking/AddTicket/UserShowData',(request,response)=>{
    con.connect((error) => {
        if (error) console.log(error);

        let sql = `SELECT * FROM customer`;

        con.query(sql,(err, result) => {
            try {
                if (err) throw err;
                //console.log(result);
                response.render(__dirname + "/views/UserShowdata", { data: result });
                // response.redirect(`/Booking/AddTicket/UserShowData`)
            }
            catch (e) {
                console.log(e);
                response.write("<h1>Some thing error</h1>");
            }
        })
    })
})

app.get('/Booking/AddTicket/UserShowData/Delete', (request, response) => { 
    let id = request.query.id;

    con.connect((error) => {
        try {
            console.log(error)
            console.log("connected 3...booking/Addfligth")
            let sql = `DELETE FROM customer WHERE id=${id}`;

            con.query(sql, (error, result) => {
                response.redirect('/Booking/AddTicket/UserShowData');
                console.log("data Deleted ");
            })
        } catch (e) {
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})


app.get("/Booking/Login", (request, response) => {
    response.sendFile(__dirname + '/wedPage/Login.html');
});
app.post('/Booking/Login', (request, response) => {
    let user = request.body.user;
    let pass = request.body.pass;
    console.log(user + " " + pass);

    con.connect((error) => {
        if (error) console.log(error);

        let sql = "SELECT * FROM customer where Gmail=? ";

        con.query(sql, [user, pass], (error, result) => {
            try {
                if (pass == result[0].Password) {
                    response.redirect("/Booking/AddTicket/UserShowData")
                }
                else {
                    response.write("<h1>invail password</h1>");
                }
            }
            catch (e) {
                console.log(e);
                response.write("<h1>invail email</h1>");
            }
        })
    })
})

// app.get("/Booking/login/Register", (request, response) => {
//     response.sendFile(__dirname + '/wedPage/Register.html');
// });

// app.post("/Booking/login/Register", (request, response) => {
//     let user = request.body.user;
//     let gender = request.body.gender;
//     let email = request.body.email;
//     let password = request.body.pass;

//     con.connect((error) => {
//         try {
//             if (error) console.log(error);
//             console.log("connected 1...")

//             let sql = `INSERT INTO customer VALUES(?,?,?,?)`;
//             con.query(sql, [user, gender, email, password], (error, result) => {
//                 //console.log(sql);
//                 response.redirect('/Booking/login');
//                 console.log("data inserted ")
//             })
//         } catch (e) {
//             console.log(e);
//             response.write("<h1>indelid url</h1>")
//         }
//     })
// })

app.get("/Booking/login/ForgotPass", (request, response) => {
    response.sendFile(__dirname + '/wedPage/ForgotPass.html');
});
app.post('/Booking/login/ForgotPass', (request, response) => {
    let email = request.body.email;
    con.connect((err) => {
        if (err) console.log(err);

        let sql = `select * from customer where email=?`;

        con.query(sql, [email], (err, result) => {
            if (err) throw err;
            try {
                if (result[0].Gmail = email) {
                    response.write("<h1>update</h1>")
                }
            } catch (e) {
                console.log(e);
                response.write("<h1>invaild email</h1>");
            }
        })
    })
})

// app.get("/Booking/login/search", (request, response) => {
//     response.sendFile(__dirname + '/wedPage/Booking.html'); // booking.html do delete 
// });

//---------------------Admain----------------------------

app.get('/Admain/login', (request, response) => {
    response.sendFile(__dirname + "/wedPage/Admainlogin.html");
})

app.post("/Admain/login", (request, response) => {
    let user = request.body.user;
    let pass = request.body.pass;

    con.connect((error) => {
        if (error) console.log(error);
 
        let sql = "SELECT * FROM Admain where email=? OR user= ? ";

        con.query(sql, [user, user], (error, result) => {

            try {
                if (pass == result[0].password) {
                    response.redirect("/Admain/login/AddFlight")
                }
                else {
                    response.write("<h1>invail password</h1>");
                }
            }
            catch (e) {
                console.log(e);
                response.write("<h1>invail email</h1>");
            }
        })
    })
})

app.get('/Admain/Register', (request, response) => {
    response.sendFile(__dirname + "/wedPage/AdmainRegister.html")
})
app.post('/Admain/Register', (request, response) => {
    let user = request.body.user;
    let gender = request.body.gender;
    let email = request.body.email;
    let password = request.body.pass
    con.connect((error) => {
        try {
            console.log(error)
            console.log("connected 2...booking/register")

            let sql = `INSERT INTO Admain VALUES(?,?,?,?)`;

            con.query(sql, [user, gender, email, password], (error, result) => {
                response.redirect('/Admain/login');
                console.log("data inserted ")
            })
        } catch (e) {
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})

app.get('/Admain/login/AddFlight', (request, response) => {
    con.connect((error) => {
        try {
            console.log(error)
            console.log("connected 3...booking/get")

            let sql = `SELECT * FROM Flight`;
            con.query(sql, (error, result) => {
                response.render(__dirname + "/views/AddFlight", { data: result });
            })
        } catch (e) {
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})

app.post('/Admain/login/AddFlight', (request, response) => { 
    let FNumber = request.body.FNumber;
    let FName = request.body.FName;
    let Departure = request.body.city;
    let destination = request.body.to_city;
    let date_time = request.body.date_time;
    let Class = request.body.class;
    con.connect((error) => {
        try {
            console.log(error)
            console.log("connected 3...booking/Addfligth")

            let sql = `INSERT INTO Flight VALUES(?,?,?,?,?,?)`;

            con.query(sql, [FNumber, FName, Departure, destination, date_time, Class], (error, result) => {
                response.redirect('/Admain/login/AddFlight');
                console.log("data inserted ")
            })
        } catch (e) {
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})


app.get('/Admain/login/AddFlight/Delete', (request, response) => { 
    let FNumber = request.query.FNumber;

    con.connect((error) => {
        try {
            console.log(error)
            console.log("connected 3...booking/Addfligth")

            let sql = `DELETE FROM Flight WHERE FNumber=${FNumber}`;

            con.query(sql, (error, result) => {
                response.redirect('/Admain/login/AddFlight');
                console.log("data Deleted ")
            })
        } catch (e) {
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})
app.listen(port, () => {
    console.log(`server start at http://localhost:${port}/Home`)
});