const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_CODE = "3750";
const FINAL_SEQUENCE = "7 - 3 - 0 - 5";

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/verify-code", (req, res) => {
    const { guess } = req.body;

    if (!/^\d{4}$/.test(guess || "")) {
        return res.status(400).json({
            success: false,
            message: "Enter four digits, web-slinger.",
        });
    }

    if (guess === SECRET_CODE) {
        return res.json({
            success: true,
            message: "You cracked the code!",
            finalSequence: FINAL_SEQUENCE,
        });
    }

    // Intentionally provides no information about individual correct digits.
    return res.json({
        success: false,
        message: "THWIP! One digit is wrong. Try another combination.",
    });
});

app.listen(PORT, () => {
    console.log(`Spider puzzle running at http://localhost:${PORT}`);
});