// Utility to validate and extract YouTube video ID from URL or direct input
export function extractYouTubeId(input) {
  // Regex for YouTube URL and ID
  const urlPattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const idPattern = /^[\w-]{11}$/;

  if (idPattern.test(input)) return input;
  const match = input.match(urlPattern);
  return match ? match[1] : null;
}

export function isValidYouTubeId(input) {
  return !!extractYouTubeId(input);
}
