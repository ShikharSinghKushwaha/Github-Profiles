console.log('Hello Beautiful World');

const userProfile = document.getElementById("userImg");
const userName = document.getElementById("username");
const dateJoined = document.getElementById("date-joined");
const loginName = document.querySelector(".user_login");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const locations = document.getElementById("location");
const twitter = document.getElementById("twitter");
const blogLink = document.getElementById("blogLink");
const company = document.getElementById("company");

const profileContainer = document.querySelector(".loader-hide");


const endpoint = "https://api.github.com";
const userFromGit = `${endpoint}/users`;

const monthName = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
function fetchingUser(username){
    const response = fetch(`${userFromGit}/${username}`);


    response
          .then(resp => {
            if (!resp.ok) {
              throw new Error(`HTTP error! Status: ${resp.status}`);
            }
            return resp.json();
          })
          .then(userData => {
            console.log(userData);
            console.log(userData.bio);

            userProfile.src = userData.avatar_url;
           checkingData(userData.name,userName)
          
            let createdAt = userData.created_at;
            let dateFun = new Date(createdAt);

            dateJoined.textContent = `Joined at ${monthName[dateFun.getMonth()]}  ${dateFun.getDate()} ${dateFun.getFullYear()}`;

            loginName.textContent = userData.login;

            checkingData(userData.bio,bio);

            repos.textContent = userData.public_repos;
            followers.textContent = userData.followers;
            following.textContent = userData.following;
             locations.textContent = userData.location;
             checkingData(userData.location,locations);


             checkingData(userData.twitter_username,twitter);
             checkingData(userData.company,company);
        
             checkingData(userData.blog,blogLink)
              blogLink.href = userData.blog;
              blogLink.target = "_blank";
              blogLink.style.color="black";

          }).catch((err) =>{
           
            if(err){
             alert('User not Found ,check the spelling error or try searching the Web')
            }  
              console.log('user not found',err);
          })
}



const searchContainer = document.querySelector(".search_input_container")
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.querySelector("#searchInput");
const loader = document.getElementById("loader");

const errorMsg = document.querySelector("#error-msg");
function validateInput(){
   if(searchInput.value === "" || searchInput === null){
  
    errorMsg.style.display = "block";
     searchContainer.style.border = "2px solid red";
     loader.style.display = 'none';
   }else{ 
loader.style.display = 'block';
  
    errorMsg.style.display = "none";
    searchContainer.style.border = "";
       return true;
   }
}

console.log(profileContainer.firstChild);

let convertToString ;
searchBtn.addEventListener('click',function() {

  let validate = validateInput()
 if(validate){
  let check =  searchInput.value;
    convertToString = check.toString().toLowerCase().split(" ").join("");
  contentLoaded();
   
 }else{
  contentLoaded();
}
});




function contentLoaded(){

  setTimeout( () => {
   
    fetchingUser(convertToString);
  loader.style.display = 'none';

  },2000);
}

let errText =  "NO DATA ON THIS"
function checkingData(item,biotext){
    if(item === null || item === ""){
        biotext.textContent = errText;
    }else{
        biotext.textContent = item;
    }

}

const themeBtn = document.querySelector(".theme_icon");

themeBtn.addEventListener("click",toggleTheme);

const lightIcon = document.getElementById("light");
const darkIcon = document.getElementById("dark");
const themeStatus = document.getElementById("theme-status");
const darkContainer = document.querySelector(".dark-icon");
// Function to toggle the theme
let darkMode = localStorage.getItem("darkmode");
console.log(darkMode);

function enableDarkMode(){
  lightIcon.style.display = "block";
  darkIcon.style.display = "none";
  document.body.classList.add("dark-theme");
  localStorage.setItem("darkmode","enabled");
}

function disableDarkMode(){
  lightIcon.style.display = "none";
  darkIcon.style.display = "block";
  document.body.classList.remove("dark-theme");
  localStorage.setItem("darkmode",null);
}

if(darkMode === "enabled"){
  enableDarkMode();
}

function toggleTheme() {
  darkMode = localStorage.getItem("darkmode");
   if(darkMode !== 'enabled'){
    enableDarkMode();
   }else{
    disableDarkMode();
   }
}

