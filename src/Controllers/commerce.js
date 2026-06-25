require("dotenv").config();
const clientPromise = require("../lib/mongodb");
const { ZipArchive } = require("archiver");
const path = require("path");
const fs = require("fs");



const downloadOrder = async (req, res) => {
    try {
        const items = req.body;

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
                    "Public",
                    "projects-zip",
                    `${item.id}.zip`
                );
            }

            if (filePath && fs.existsSync(filePath)) {
                files.push(filePath);
            }
        }


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


module.exports = {
    downloadOrder,
};