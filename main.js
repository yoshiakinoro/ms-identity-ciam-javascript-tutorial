const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
    scopes: ["openid", "profile", "email"]
};

// リダイレクト後の処理
msalInstance.handleRedirectPromise()
    .then((response) => {
        if (response) {
            const account = response.account;
            msalInstance.setActiveAccount(account);
            document.getElementById("welcome-div").innerText = `Welcome, ${account.username}`;
            document.getElementById("signIn").classList.add("d-none");
            document.getElementById("signOut").classList.remove("d-none");
        }
    })
    .catch((error) => {
        console.error("Redirect error:", error);
    });

function signIn() {
    msalInstance.loginRedirect(loginRequest);
}

function signOut() {
    msalInstance.logoutRedirect();
}