import { rwClient } from "./lib/twitter";
import { format, formatInTimeZone } from 'date-fns-tz';

async function main() {
  console.log("Starting the process to tweet the day's name...");

  try {
    const daysInIndonesian: Array<string> = [
      "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
    ];
    
    const timeZone = 'Asia/Jakarta'; // WIB is GMT+7
    const now = new Date();
    const nowInTimeZone = formatInTimeZone(now, timeZone, 'yyyy-MM-dd HH:mm:ss.SSS zzz');

    console.log(`System time (UTC): ${now.toISOString()}`);
    console.log(`Formatted time in ${timeZone}: ${nowInTimeZone}`);
    
    // 'i' returns the ISO day of the week, where 1 is Monday and 7 is Sunday.
      const dayOfWeek = parseInt(format(nowInTimeZone, 'i', { timeZone }), 10);
    
    // We need to convert this to an index where Sunday is 0.
    // getDay() format: Sunday = 0, Monday = 1, ..., Saturday = 6
    // 'i' format: Monday = 1, ..., Saturday = 6, Sunday = 7
    const todayIndex = dayOfWeek % 7;

    const todaysName: string = daysInIndonesian[todayIndex];

    const tweetText: string = `Hari ini hari ${todaysName}`;

    console.log(`Preparing tweet: "${tweetText}"`);

    // const { data: createdTweet } = await rwClient.v2.tweet(tweetText);

    // console.log(`✅ Tweet sent successfully! ID: ${createdTweet.id}, Text: "${createdTweet.text}"`);

  } catch (error) {

    console.error("❌ Failed to tweet, an error occurred:", error);
  }
}

main();
