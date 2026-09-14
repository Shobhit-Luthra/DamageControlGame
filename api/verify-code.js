export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    const { guess } = req.body;
    const SECRET_CODE = "3750";
    const FINAL_SEQUENCE = "7 - 3 - 0 - 5";

    if (!/^\d{4}$/.test(guess || "")) {
        return res.status(400).json({
            success: false,
            message: "Enter four digits, web-slinger.",
        });
    }

    if (guess === SECRET_CODE) {
        return res.status(200).json({
            success: true,
            message: "You cracked the code!",
            finalSequence: FINAL_SEQUENCE,
        });
    }

    // Intentionally provides no information about individual correct digits.
    return res.status(200).json({
        success: false,
        message: "THWIP! One digit is wrong. Try another combination.",
    });
}
