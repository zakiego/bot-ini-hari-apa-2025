import { rwClient } from "./lib/twitter";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale/id";

async function main() {
  console.log("Starting the process to tweet the day's name...");

  try {
    const timeZone = "Asia/Jakarta"; // WIB is GMT+7
    const now = new Date();
    const nowInTimeZone = formatInTimeZone(now, timeZone, "yyyy-MM-dd HH:mm:ss.SSS zzz");
    const dayOfWeek = formatInTimeZone(now, timeZone, "EEEE", { locale: id });

    console.log(`System time (UTC): ${now.toISOString()}`);
    console.log(`Formatted time in ${timeZone}: ${nowInTimeZone}`);
    console.log(`Day of week: ${dayOfWeek}`);

    const tweetText: string = `Hari ini hari ${dayOfWeek}`;

    console.log(`Preparing tweet: "${tweetText}"`);

    const { data: createdTweet } = await rwClient.v2.tweet(tweetText);

    console.log(`✅ Tweet sent successfully! ID: ${createdTweet.id}, Text: "${createdTweet.text}"`);
  } catch (error) {
    console.error("❌ Failed to tweet, an error occurred:", error);
  }
}

main();
