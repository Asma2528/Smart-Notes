const cron = require("node-cron");
const Note = require("../models/Note");
const logger = require("../utils/logger");

// Flag to prevent overlapping runs
let isRunning = false;

/**
 * Deletes trashed notes older than 7 days
 */
async function deleteOldTrashedNotes() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return await Note.deleteMany({
    trashed: true,
    trashedAt: { $lte: sevenDaysAgo }
  });
}

/**
 * Immediately run on startup (optional)
 */
(async () => {
  try {
    const result = await deleteOldTrashedNotes();
    if (result.deletedCount > 0) {
      logger.info(`[INIT] Immediately deleted ${result.deletedCount} old trashed notes.`);
    }
  } catch (error) {
    logger.error(`[INIT] Error deleting old trashed notes: ${error.message}`);
  }
})();

/**
 * Schedule the cron job
 */
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || "*/10 * * * *"; // every 10 minutes by default

cron.schedule(CRON_SCHEDULE, async () => {
  if (isRunning) {
    logger.warn("[CRON] Trash cleanup is still running. Skipping this cycle.");
    return;
  }

  isRunning = true;
  logger.info("[CRON] Starting trash cleanup job...");

  try {
    const result = await deleteOldTrashedNotes();
    if (result.deletedCount > 0) {
      logger.info(`[CRON] Deleted ${result.deletedCount} old trashed notes.`);
    } else {
      logger.info("[CRON] No trashed notes found for deletion.");
    }
  } catch (error) {
    logger.error(`[CRON] Error deleting trashed notes: ${error.message}`);
  } finally {
    isRunning = false;
  }
});

logger.info(`[CRON] Trash cleanup cron scheduled with: '${CRON_SCHEDULE}'`);

module.exports = { deleteOldTrashedNotes };
