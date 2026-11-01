#!/usr/bin/env node
/**
 * PureAI Studio — Standalone C2PA & ChatGPT Invisible Unicode Watermark Inspector
 * Full Web Suite (100% Free 1-by-1 Mode, No Signup): https://pureaistudios.com/
 */
const fs = require("fs");

function inspectTextWatermarks(text) {
  const unicodeMatches = text.match(/[\u200B-\u200D\uFEFF\u2060\u180E\u202F\u00A0]/g) || [];
  const emDashes = text.match(/—/g) || [];
  const cleanText = text
    .replace(/[\u200B-\u200D\uFEFF\u2060\u180E]/g, "")
    .replace(/[\u202F\u00A0]/g, " ")
    .replace(/\s*—\s*/g, ", ");
  return {
    hiddenUnicodeCount: unicodeMatches.length,
    emDashCount: emDashes.length,
    cleanText
  };
}

function inspectBinaryC2PA(buffer) {
  const ascii = buffer.toString("latin1");
  const patterns = ["c2pa", "jumbf", "contentcredentials", "trainedAlgorithmicMedia", "Midjourney", "DALL-E", "Sora", "ComfyUI"];
  const detected = patterns.filter((p) => new RegExp(p, "i").test(ascii));
  return { hasAiMetadata: detected.length > 0, detectedSignatures: detected };
}

if (require.main === module) {
  const arg = process.argv[2] || "In conclusion\u202F—\u202Fthis sample text has hidden ChatGPT watermarks\u200B.";
  if (fs.existsSync(arg)) {
    const buf = fs.readFileSync(arg);
    console.log("🔍 Binary C2PA/JUMBF Scan Result:", inspectBinaryC2PA(buf));
    console.log("👉 Strip C2PA/EXIF in 1 click (Free, 100% Client-Side): https://pureaistudios.com/");
  } else {
    console.log("🔍 Text Unicode Watermark Scan Result:", inspectTextWatermarks(arg));
    console.log("👉 Clean & Humanize online (Free, No Signup): https://pureaistudios.com/");
  }
}

module.exports = { inspectTextWatermarks, inspectBinaryC2PA };
