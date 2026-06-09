require("dotenv").config();
const path = require("path");
const fs = require("fs");
const books = require("../data/hadith/hadith-data/data")
const sahihbukhari = require("../data/hadith/Hadith-Json/Sahih-Bukhari.json");
const sahihmuslim = require("../data/hadith/Hadith-Json/Sahih-Muslim.json");
const jamiattirmidhi = require("../data/hadith/Hadith-Json/Jami-at-tirmidhi.json");
const abudawood = require("../data/hadith/Hadith-Json/Abu-Dawood.json");
const sunannasai = require("../data/hadith/Hadith-Json/Sunan-Nasai.json");
const mishkatalmasabih = require("../data/hadith/Hadith-Json/Mishkat-al-Masabih.json");
const ibnemajah = require("../data/hadith/Hadith-Json/Ibn-e-Majah.json");



const gethadithbooklist = async (req, res) => {
    try {
        // console.log("request giri bhaya on getbook list per");
        const hadithbooks = await books;
        res.status(200).json(hadithbooks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const gethadithlistbybook = async (req, res) => {
    try {
        // console.log("request giri bhaya on get hadith list by book name");

        const { bookslug, pagenumber } = req.body;
        // console.log(bookslug, pagenumber)  // yahan tak sahi hai 
        const page = Number(pagenumber) || 1;
        const limit = 20;

        const bookjson = {
            sahihbukhari,
            sahihmuslim,
            jamiattirmidhi,
            abudawood,
            sunannasai,
            mishkatalmasabih,
            ibnemajah
        };

        const book = books.find(item => item.id === bookslug);
        // console.log(book)  // ye bhi sahi hai 
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        const findbookjson = bookjson[book.importing];

        if (!findbookjson) {
            return res.status(404).json({
                success: false,
                message: "Book data not found"
            });
        }

        const start = (page - 1) * limit;
        const end = start + limit;

        const hadiths = findbookjson.slice(start, end);
        // console.log("yahan se check kro ", page, limit, findbookjson.length, Math.ceil(findbookjson.length / limit), hadiths)

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalHadiths: findbookjson.length,
            totalPages: Math.ceil(findbookjson.length / limit),
            hadiths
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// okkay 
const getrandomhadith = async (req, res) => {
    try {
        // console.log("request giri bhaya random hadith ke liye");

        const bookjson = [
            sahihbukhari,
            sahihmuslim,
            jamiattirmidhi,
            abudawood,
            sunannasai,
            mishkatalmasabih,
            ibnemajah
        ];

        const randomBook =
            bookjson[Math.floor(Math.random() * bookjson.length)];

        const randomHadith =
            randomBook[Math.floor(Math.random() * randomBook.length)];

        if (!randomHadith) {
            return res.status(404).json({
                success: false,
                message: "Random hadith not found"
            });
        }
        // console.log(randomHadith)
        return res.status(200).json(randomHadith);

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};


// okkay
const gethadithbynumber = async (req, res) => {
    try {
        // console.log("request giri bhaya hadith ke number se hadith ke liye");
        const { bookslug, hadithnumber } = req.body;
        // console.log(bookslug, hadithnumber)

        const bookjson = { sahihbukhari, sahihmuslim, jamiattirmidhi, abudawood, sunannasai, mishkatalmasabih, ibnemajah }
        // console.log(bookjson)

        const booklist = books;
        // console.log(booklist)


        const book = booklist.find(item => item.id === bookslug);
        // console.log(book) 

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }


        const strval = book.importing;
        const findbookjson = bookjson[strval];
        // console.log(findbookjson)

        const hadith = findbookjson.find(
            item => String(item.hadithNumber) === String(hadithnumber)
        );

        if (!hadith) {
            res.status(502).json({ success: false, message: "something went wrong" })
        }

        // console.log(hadith)

        res.status(200).json(hadith);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = {
    gethadithbynumber,
    getrandomhadith,
    gethadithlistbybook,
    gethadithbooklist
};