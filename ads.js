// Ads are OFF until you have an approved Google AdSense account. Then set enabled:true and fill in your IDs.
export const ADS = { enabled: false, client: "ca-pub-XXXXXXXXXXXXXXXX", slot: "XXXXXXXXXX" };
let loaded = false;

export const adHtml = () => ADS.enabled
  ? `<div class="adbox"><p>Sponsored</p><ins class="adsbygoogle" style="display:block" data-ad-client="${ADS.client}" data-ad-slot="${ADS.slot}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`
  : "";

export function mountAd() {
  if (!ADS.enabled) return;
  if (!loaded) {
    const s = document.createElement("script");
    s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ADS.client;
    document.head.appendChild(s); loaded = true;
  }
  try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
}
