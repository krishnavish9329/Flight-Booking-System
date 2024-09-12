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

        let sql = `SELECT * FROM Flight where Departure LIKE '%${Departure}%' AND destination LIKE '%${destination}%' AND date LIKE '%${date}%' AND time LIKE '%${time}%' AND class LIKE '%${Class}%' `;

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

//---------------------Admain----------------------------

app.get('/Admain/login', (request, response) => {
    response.sendFile(__dirname + "/wedPage/Admainlogin.html");
})
app.post("/Admain/login", (request, response) => {
    let user = request.body.user;
    let pass = request.body.pass;

    con.connect((error) => {
        if (error) console.log(error);

        let sql = "SELECT * FROM Admain where user=? ";

        con.query(sql, [user, pass], (error, result) => {

            try {
                if (pass == result[0].password) {
                    response.redirect("/Booking/login/AddFlight")
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
    response.sendFile(__dirname + "/wedPage/AddFlight.html");
})

app.post('/Admain/login/AddFlight', (request, response) => {
    let Departure = request.body.city;
    let destination = request.body.to_city;
    let time = request.body.time;
    let date = request.body.date;
    let Class = request.body.class;
    let to_parson = request.body.par_parson;
    con.connect((error) => {
        try {
            console.log(error)
            console.log("connected 3...booking/Addfligth")

            let sql = `INSERT INTO Flight VALUES(?,?,?,?,?,?)`;

            con.query(sql, [Departure, destination, date, time, Class, to_parson], (error, result) => {
                response.redirect('/Booking/login/AddFlight');
                console.log("data inserted ")
            })
        } catch (e) {
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})




app.get("/Login", (request, response) => {
    response.sendFile(__dirname + '/wedPage/Login.html');
});
app.post('/Login', (request, response) => {
    let user = request.body.user;
    let pass = request.body.pass;
    console.log(user + " " + pass);

    con.connect((error) => {
        if (error) console.log(error);

        let sql = "SELECT * FROM customer where user=? ";

        con.query(sql, [user, pass], (error, result) => {

            try {
                if (pass == result[0].password) {
                    response.redirect("/Booking/login/search")
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

app.get("/login/Register", (request, response) => {
    response.sendFile(__dirname + '/wedPage/Register.html');
});
app.post("/login/Register", (request, response) => {
    let user = request.body.user;
    let gender = request.body.gender;
    let email = request.body.email;
    let password = request.body.pass;

    con.connect((error) => {
        try {
            if (error) console.log(error);
            console.log("connected 1...")

            let sql = `INSERT INTO customer VALUES(?,?,?,?)`;
            con.query(sql, [user, gender, email, password], (error, result) => {
                //console.log(sql);
                response.redirect('/login');
                console.log("data inserted ")
            })
        } catch (e) {
            console.log(e);
            response.write("<h1>indelid url</h1>")
        }
    })
})

app.get("/login/ForgotPass", (request, response) => {
    response.sendFile(__dirname + '/wedPage/ForgotPass.html');
});
app.post('/login/ForgotPass', (request, response) => {
    let email = request.body.email;
    con.connect((err) => {
        if (err) console.log(err);

        let sql = `select * from customer where email=?`;

        con.query(sql, [email], (err, result) => {
            if (err) throw err;
            try {
                if (result[0].email = email) {
                    response.write("<h1>update</h1>")
                }
            } catch (e) {
                console.log(e);
                response.write("<h1>invaild email</h1>")
            }

        })
    })
})

app.get("/Booking/login/search", (request, response) => {
    response.sendFile(__dirname + '/wedPage/Booking.html');
});

//----------------------------------------------------------
// app.get('/Admain/login', (request, response) => {
//     response.sendFile(__dirname + "/wedPage/Admainlogin.html");
// })
// app.post("/Admain/login", (request, response) => {
//     let user = request.body.user;
//     let pass = request.body.pass;

//     con.connect((error) => {
//         if (error) console.log(error);

//         let sql = "SELECT * FROM Admain where user=? ";

//         con.query(sql, [user, pass], (error, result) => {

//             try {
//                 if (pass == result[0].password) {
//                     response.redirect("/Booking/login/AddFlight")
//                 }
//                 else {
//                     response.write("<h1>invail password</h1>");
//                 }
//             }
//             catch (e) {
//                 console.log(e);
//                 response.write("<h1>invail email</h1>");
//             }
//         })
//     })
// })

// app.get('/Booking/Register', (request, response) => {
//     response.sendFile(__dirname + "/wedPage/AdmainRegister.html")
// })
// app.post('/Booking/Register', (request, response) => {
//     let user = request.body.user;
//     let gender = request.body.gender;
//     let email = request.body.email;
//     let password = request.body.pass
//     con.connect((error) => {
//         try {
//             console.log(error)
//             console.log("connected 2...booking/register")

//             let sql = `INSERT INTO Admain VALUES(?,?,?,?)`;

//             con.query(sql, [user, gender, email, password], (error, result) => {
//                 response.redirect('/Booking/login');
//                 console.log("data inserted ")
//             })
//         } catch (e) {
//             console.log(e);
//             response.write("<h1>indelid url</h1>")
//         }
//     })
// })

// app.get('/Booking/login/AddFlight', (request, response) => {
//     response.sendFile(__dirname + "/wedPage/AddFlight.html");
// })

// app.post('/Booking/login/AddFlight', (request, response) => {
//     let Departure = request.body.city;
//     let destination = request.body.to_city;
//     let time = request.body.time;
//     let date = request.body.date;
//     let Class = request.body.class;
//     let to_parson = request.body.par_parson;
//     con.connect((error) => {
//         try {
//             console.log(error)
//             console.log("connected 3...booking/Addfligth")

//             let sql = `INSERT INTO Flight VALUES(?,?,?,?,?,?)`;

//             con.query(sql, [Departure, destination, date, time, Class, to_parson], (error, result) => {
//                 response.redirect('/Booking/login/AddFlight');
//                 console.log("data inserted ")
//             })
//         } catch (e) {
//             console.log(e);
//             response.write("<h1>indelid url</h1>")
//         }
//     })
// })


app.listen(port, () => {
    console.log(`server start at http://localhost:${port}/Home`)
});