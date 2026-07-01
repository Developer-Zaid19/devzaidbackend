require("dotenv").config();
const clientPromise = require("../lib/mongodb");
const { ZipArchive } = require("archiver");
const path = require("path");
const fs = require("fs");
const { apks } = require("../data/Content/data")


const downloadOrder = async (req, res) => {
    try {
        const items = req.body;
        // console.log(items)
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No items provided",
            });
        }

        const files = [];

        for (const item of items) {
            let filePath = null;

            if (item.type === "notes") {
                filePath = path.join(
                    process.cwd(),
                    "src",
                    "Public",
                    "note-pdf",
                    `${item.id}.pdf`
                );
            } else if (item.type === "sourcecode") {
                filePath = path.join(
                    process.cwd(),
                    "src",
                    "products",
                    "projects-zip",
                    `${item.id}.zip`
                );
            } else if (item.type === "apk") {
                filePath = path.join(
                    process.cwd(),
                    "src",
                    "products",
                    "apks-zip",
                    `${item.id}.zip`
                );
            }

            if (filePath && fs.existsSync(filePath)) {
                files.push(filePath);
            }
        }

        // console.log(files)
        if (files.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No valid files found",
            });
        }


        res.setHeader("Content-Type", "application/zip");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="DeveloperZaid-${Date.now()}.zip"`
        );

        const archive = new ZipArchive("zip", {
            zlib: { level: 9 },
        });

        archive.on("error", (err) => {
            console.error("ARCHIVE ERROR:", err);
            throw err;
        });

        archive.pipe(res);

        for (const file of files) {
            archive.file(file, {
                name: path.basename(file),
            });
        }

        await archive.finalize();
    } catch (error) {
        console.error(error);
        console.error("DOWNLOAD ERROR:", error);

        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
};

const getapkproducts = async (req, res) => {
    try {
        // console.log("kisi ne apks ki list mangi hai")
        // console.log(apks)
        res.status(200).json(apks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getapkbyslug = async (req, res) => {
    try {
        const { slug } =  req.params;
        // console.log(slug)
        // console.log(apks)
        const apk = await apks.find((item) => item.slug === slug)
        if (!apk) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(apk);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    downloadOrder,
    getapkproducts,
    getapkbyslug,
};