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
        console.log("request giri bhaya on getbook list per");
        const hadithbooks = await books;
        res.status(200).json(hadithbooks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const gethadithlistbybook = async (req, res) => {
    try {
        console.log("request giri bhaya on get hadith list by book name");
        const { bookslug } = req.params;
        const booklist = books;
        const bookjson = { sahihbukhari, sahihmuslim, jamiattirmidhi, abudawood, sunannasai, mishkatalmasabih, ibnemajah }

        const book = await booklist.findOne({ id: bookslug });
        if (!book) {
            res.status(502).json({ success: false, message: "couldnot find book" });
        }
        const strval = book.importing
        const findbookjson = bookjson.strval
        res.status(200).json(findbookjson.slice(0, 50));

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const getrandomhadith = async (req, res) => {
    try {
        console.log("request giri bhaya random hadith ke liye");
        const bookjson = [sahihbukhari, sahihmuslim, jamiattirmidhi, abudawood, sunannasai, mishkatalmasabih, ibnemajah];
        const randomBook = bookjson[Math.floor(Math.random() * bookjson.length)];
        const randomhadithnumber = Math.floor(Math.random() * randomBook.length);
        const randomhadith = randomBook.findOne({ id: randomhadithnumber });

        if (!randomhadith || !randomBook) {
            res.status(502).json({ message: "could not find random hadith or random book" });
        }
        res.status(200).json(randomhadith);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const gethadithbynumber = async (req, res) => {
    try {
        console.log("request giri bhaya hadith ke number se hadith ke liye");
        const { bookslug, hadithnumber } = req.body;
        const booklist = books;
        const bookjson = { sahihbukhari, sahihmuslim, jamiattirmidhi, abudawood, sunannasai, mishkatalmasabih, ibnemajah }
        const book = await booklist.findOne({ id: bookslug });
        const strval = book.importing;
        const findbookjson = bookjson.strval;
        const hadith = findbookjson.findOne({ id: hadithnumber });

        res.status(200).json(hadith);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

