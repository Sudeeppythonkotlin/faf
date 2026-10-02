// Starter list of Indian universities. [name, state]. IDs/states are derived automatically.
// (On Day 7 this moves into the database so admins can add/edit universities.)
const RAW = [
["University of Kerala","Kerala"],["Mahatma Gandhi University","Kerala"],["University of Calicut","Kerala"],["Kannur University","Kerala"],
["APJ Abdul Kalam Technological University","Kerala"],["Cochin University of Science and Technology","Kerala"],
["Kerala University of Health Sciences","Kerala"],["Sree Sankaracharya University of Sanskrit","Kerala"],["Kerala Agricultural University","Kerala"],
["Digital University Kerala","Kerala"],["Thunchath Ezhuthachan Malayalam University","Kerala"],["Kerala University of Fisheries and Ocean Studies","Kerala"],
["Kerala Veterinary and Animal Sciences University","Kerala"],
["University of Madras","Tamil Nadu"],["Anna University","Tamil Nadu"],["Bharathiar University","Tamil Nadu"],["Bharathidasan University","Tamil Nadu"],
["Madurai Kamaraj University","Tamil Nadu"],["Manonmaniam Sundaranar University","Tamil Nadu"],["Alagappa University","Tamil Nadu"],["Periyar University","Tamil Nadu"],
["Tamil Nadu Dr. M.G.R. Medical University","Tamil Nadu"],["Vellore Institute of Technology","Tamil Nadu"],["SRM Institute of Science and Technology","Tamil Nadu"],
["Bangalore University","Karnataka"],["University of Mysore","Karnataka"],["Visvesvaraya Technological University","Karnataka"],["Mangalore University","Karnataka"],
["Karnatak University","Karnataka"],["Rajiv Gandhi University of Health Sciences","Karnataka"],["Christ University","Karnataka"],["Manipal Academy of Higher Education","Karnataka"],
["Andhra University","Andhra Pradesh"],["Sri Venkateswara University","Andhra Pradesh"],["Acharya Nagarjuna University","Andhra Pradesh"],
["Jawaharlal Nehru Technological University Kakinada","Andhra Pradesh"],["Jawaharlal Nehru Technological University Anantapur","Andhra Pradesh"],
["Osmania University","Telangana"],["Kakatiya University","Telangana"],["Jawaharlal Nehru Technological University Hyderabad","Telangana"],
["University of Hyderabad","Telangana"],["Telangana University","Telangana"],
["University of Mumbai","Maharashtra"],["Savitribai Phule Pune University","Maharashtra"],["Rashtrasant Tukadoji Maharaj Nagpur University","Maharashtra"],
["Dr. Babasaheb Ambedkar Marathwada University","Maharashtra"],["Shivaji University","Maharashtra"],["Symbiosis International University","Maharashtra"],["NMIMS University","Maharashtra"],
["University of Delhi","Delhi"],["Jawaharlal Nehru University","Delhi"],["Jamia Millia Islamia","Delhi"],["Guru Gobind Singh Indraprastha University","Delhi"],
["Delhi Technological University","Delhi"],["Ambedkar University Delhi","Delhi"],
["Banaras Hindu University","Uttar Pradesh"],["Aligarh Muslim University","Uttar Pradesh"],["University of Lucknow","Uttar Pradesh"],["University of Allahabad","Uttar Pradesh"],
["Chaudhary Charan Singh University","Uttar Pradesh"],["Dr. A.P.J. Abdul Kalam Technical University","Uttar Pradesh"],["Amity University","Uttar Pradesh"],
["University of Calcutta","West Bengal"],["Jadavpur University","West Bengal"],["Visva-Bharati","West Bengal"],["Presidency University","West Bengal"],
["Maulana Abul Kalam Azad University of Technology","West Bengal"],
["Gujarat University","Gujarat"],["Maharaja Sayajirao University of Baroda","Gujarat"],["Gujarat Technological University","Gujarat"],["Sardar Patel University","Gujarat"],
["University of Rajasthan","Rajasthan"],["Mohanlal Sukhadia University","Rajasthan"],["Rajasthan Technical University","Rajasthan"],["BITS Pilani","Rajasthan"],
["Barkatullah University","Madhya Pradesh"],["Rajiv Gandhi Proudyogiki Vishwavidyalaya","Madhya Pradesh"],["Devi Ahilya Vishwavidyalaya","Madhya Pradesh"],
["Punjabi University","Punjab"],["Guru Nanak Dev University","Punjab"],["Lovely Professional University","Punjab"],["Chandigarh University","Punjab"],
["Panjab University","Chandigarh"],
["Maharshi Dayanand University","Haryana"],["Kurukshetra University","Haryana"],
["Patna University","Bihar"],["Magadh University","Bihar"],["Ranchi University","Jharkhand"],
["Utkal University","Odisha"],["KIIT University","Odisha"],["Berhampur University","Odisha"],
["Gauhati University","Assam"],["Dibrugarh University","Assam"],
["Himachal Pradesh University","Himachal Pradesh"],["Kumaun University","Uttarakhand"],["Doon University","Uttarakhand"],
["University of Kashmir","Jammu and Kashmir"],["University of Jammu","Jammu and Kashmir"],
["Goa University","Goa"],["Pt. Ravishankar Shukla University","Chhattisgarh"],["Pondicherry University","Puducherry"],
];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const UNIVERSITIES = RAW.map(([name, state]) => ({ id: slug(name), name, state, stateId: slug(state) }))
  .sort((a, b) => a.name.localeCompare(b.name));
export const findUniversityByName = (n) => UNIVERSITIES.find((u) => u.name.toLowerCase() === n.trim().toLowerCase());
export const findUniversityById = (id) => UNIVERSITIES.find((u) => u.id === id);

export const INTERESTS = [
  ["gaming","🎮 Gaming"],["football","⚽ Football"],["cricket","🏏 Cricket"],["motorsport","🏎️ Motorsport"],
  ["music","🎵 Music"],["movies","🎬 Movies"],["anime","🍥 Anime"],["fitness","💪 Fitness"],
  ["travel","✈️ Travel"],["business","💼 Business"],["technology","💻 Technology"],["fashion","👕 Fashion"],
  ["photography","📷 Photography"],["books","📚 Books"],["art","🎨 Art"],["food","🍜 Food"],
];
