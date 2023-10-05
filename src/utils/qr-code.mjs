export function getQrCodeForUrl(url) {
  return `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${url}`;
}
