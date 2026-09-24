/**
 * IRONFORGE — lightweight lead notification backend
 * ------------------------------------------------------------
 * This file is NOT a website file. It goes into Google Apps
 * Script, not into your web hosting. Setup steps are at the
 * bottom of this file.
 * ------------------------------------------------------------
 */

// 1) Put the email that should receive a notification for every lead.
const ADMIN_EMAIL = "admin@ironforge.pk";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    sendAdminEmail_(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", service: "ironforge-leads" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendAdminEmail_(data) {
  const subject = `New trial booking — ${data.program || "program"} — ${data.name || "unknown"}`;

  const body =
    "A new free trial session was just requested on the website.\n\n" +
    "Name: " + (data.name || "-") + "\n" +
    "Phone: " + (data.phone || "-") + "\n" +
    "Email: " + (data.email || "-") + "\n\n" +
    "Program: " + (data.program || "-") + "\n" +
    "Plan interested: " + (data.plan || "-") + "\n" +
    "Preferred date: " + (data.preferredDate || "-") + "\n" +
    "Preferred time: " + (data.preferredTime || "-") + "\n\n" +
    "Notes: " + (data.notes || "-") + "\n";

  MailApp.sendEmail(ADMIN_EMAIL, subject, body);
}

/**
 * ------------------------------------------------------------
 * SETUP — do this once
 * ------------------------------------------------------------
 * 1. Google Apps Script open karein.
 *
 * 3. Jo default code khula hai usse delete karke, is poori file
 *    (google-apps-script.gs) ka code paste kar dein.
 *
 * 4. Upar ADMIN_EMAIL waali line me apna asli admin email
 *    address likh dein.
 *
 * 5. Save karein (disk icon), phir top-right "Deploy" button
 *    > "New deployment" > gear icon > "Web app" select karein.
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    "Deploy" pe click karein aur permissions allow kar dein
 *    (Google warning dikhayega "unsafe" — Advanced > Go to
 *    project (unsafe) select karke allow kar dein, yeh normal
 *    hai kyunke script khud aapka hai).
 *
 * 6. Deploy hone ke baad ek "Web app URL" milega, kuch is
 *    tarah: https://script.google.com/macros/s/XXXXXXXX/exec
 *    Yeh URL copy karein.
 *
 * 7. script.js file kholein aur sabse upar CONFIG.JSON_ENDPOINT
 *    me yeh URL paste kar dein:
 *
 *        const CONFIG = {
 *          JSON_ENDPOINT: "https://script.google.com/macros/s/XXXXXXXX/exec"
 *        };
 *
 * 8. Ab jab bhi koi client website se free trial book karega,
 *    ADMIN_EMAIL par notification email chali jayegi.
 *
 * Note: agar aap kabhi is script ko edit karein (code change
 * karein), to Deploy > Manage deployments > edit (pencil icon)
 * > "New version" select karke dobara deploy karna padega,
 * warna purana version hi chalta rahega.
 */
