import { createClient } from "redis";

const client = createClient({
  socket: {
    port: 6381,
  },
});
[1]
async function main() {
  await client.connect();
  while (1) {
    const valueFromQueue = await client.brPop("submissions", 0);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(">>>>> inside worker >>>>>", valueFromQueue);
  }
}

main();
