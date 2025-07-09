const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const tokenIdInput = document.getElementById('tokenIdInput');
const fetchBtn = document.getElementById('fetchBtn');
const accessorySelector = document.getElementById('accessorySelector');
const downloadBtn = document.getElementById('downloadBtn');

let baseImage = new Image();
let accessoryImage = new Image();

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (baseImage.src) ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  if (accessoryImage.src) ctx.drawImage(accessoryImage, 0, 0, canvas.width, canvas.height);
}

function loadByTokenId(tokenId) {
  const paddedId = tokenId.padStart(3, '0');
  const imageUrl = `https://bafybeihx7j3tzwdeadts4v7wz5xtwanyrrm6ilpi6yf37lxhwuse7kkfqy.ipfs.w3s.link/${paddedId}.webp`;

  baseImage = new Image();
  baseImage.crossOrigin = 'anonymous';
  baseImage.onload = drawCanvas;
  baseImage.onerror = () => alert('Image not found on IPFS (.webp).');
  baseImage.src = imageUrl;
}

fetchBtn.addEventListener('click', () => {
  const tokenId = tokenIdInput.value.trim();
  if (!tokenId) return alert('Please enter a token ID');
  loadByTokenId(tokenId);
});

accessorySelector.addEventListener('change', () => {
  accessoryImage = new Image();
  accessoryImage.crossOrigin = 'anonymous';
  accessoryImage.onload = drawCanvas;
  accessoryImage.src = accessorySelector.value;
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'prime8-customized.png';
  link.href = canvas.toDataURL();
  link.click();
});
