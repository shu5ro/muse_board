import localFont from 'next/font/local'

const lineSeedTh = localFont({
  src: './fonts/LINESeedJP_A_OTF_Th.otf',
  variable: "--font-line-seed-th",
});

const lineSeedRg = localFont({
  src: './fonts/LINESeedJP_A_OTF_Rg.otf',
  variable: "--font-line-seed-rg",
});

const lineSeedBd = localFont({
  src: './fonts/LINESeedJP_A_OTF_Bd.otf',
  variable: "--font-line-seed-bd",
});

const lineSeedEb = localFont({
  src: './fonts/LINESeedJP_A_OTF_Eb.otf',
  variable: "--font-line-seed-eb",
});

export { lineSeedTh, lineSeedRg, lineSeedBd, lineSeedEb };