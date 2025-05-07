# AgriConnect: Authentication Module (Pseudocode & TDD Anchors)

## 1. Responsibilities

- Handle Google Social Login (OAuth)
- Manage user sessions (login, logout, token refresh)
- Enforce authentication for protected actions
- Store and sync user profile data
- Support offline login (cached credentials/session)
- Validate user input and handle errors

## 2. Module Structure

- AuthService
  - loginWithGoogle(id_token)
  - logout()
  - getCurrentUser()
  - refreshToken()
  - isAuthenticated()
  - syncUserProfile()
  - offlineLogin()
- AuthState
  - currentUser
  - accessToken
  - refreshToken
  - isOffline

## 3. Pseudocode

```
// AuthService: Handles all authentication logic

function loginWithGoogle(id_token):
    // TEST: Should authenticate user with valid Google id_token
    if not id_token:
        // TEST: Should reject login with missing token
        return error("Missing token")
    response = callGoogleOAuthAPI(id_token)
    if response.error:
        // TEST: Should handle invalid token error
        return error("Invalid token")
    saveTokens(response.access_token, response.refresh_token)
    user = fetchUserProfile(response.access_token)
    saveUserProfile(user)
    // TEST: Should store user profile after successful login
    return user

function logout():
    // TEST: Should clear tokens and user profile on logout
    clearTokens()
    clearUserProfile()
    return success

function getCurrentUser():
    // TEST: Should return current user if authenticated
    if not tokensExist():
        return null
    return loadUserProfile()

function refreshToken():
    // TEST: Should refresh access token using refresh token
    if not refreshTokenExists():
        return error("No refresh token")
    response = callRefreshAPI(refreshToken)
    if response.error:
        // TEST: Should handle refresh failure
        return error("Refresh failed")
    saveTokens(response.access_token, response.refresh_token)
    return success

function isAuthenticated():
    // TEST: Should return true if valid access token exists
    return tokensExist() and tokenNotExpired()

function syncUserProfile():
    // TEST: Should sync user profile with backend
    if not isAuthenticated():
        return error("Not authenticated")
    user = fetchUserProfile(accessToken)
    saveUserProfile(user)
    return user

function offlineLogin():
    // TEST: Should allow login if valid cached session exists and offline
    if isOffline() and cachedSessionValid():
        return loadUserProfile()
    return error("No offline session")

// Error handling: All errors return user-friendly messages
// Input validation: All inputs checked for presence and format
// Performance: Token and profile storage optimized for quick access
```

## 4. TDD Anchors

- // TEST: Should authenticate user with valid Google id_token
- // TEST: Should reject login with missing token
- // TEST: Should handle invalid token error
- // TEST: Should store user profile after successful login
- // TEST: Should clear tokens and user profile on logout
- // TEST: Should return current user if authenticated
- // TEST: Should refresh access token using refresh token
- // TEST: Should handle refresh failure
- // TEST: Should return true if valid access token exists
- // TEST: Should sync user profile with backend
- // TEST: Should allow login if valid cached session exists and offline

## 5. Error Handling

- All errors return user-friendly, localized messages
- Invalid or expired tokens prompt re-authentication
- Offline login only allowed with valid cached session

## 6. Performance

- Minimize network calls; cache tokens and profile securely
- Fast local checks for authentication state