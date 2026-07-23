import net from 'net';

const client = new net.Socket();
client.setTimeout(5000);

client.connect(5432, '103.93.162.19', () => {
  console.log('Successfully connected to 103.93.162.19:5432 TCP port!');
  client.destroy();
});

client.on('error', (err) => {
  console.error('Connection error:', err.message);
});

client.on('timeout', () => {
  console.error('Connection timed out!');
  client.destroy();
});
