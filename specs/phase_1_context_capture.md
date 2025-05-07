# AgriConnect: Context Capture & Project Overview

## 1. Project Background

AgriConnect is a mobile-first application designed to empower small and marginal Indian farmers by providing essential tools and information. The app aims to bridge the digital divide for rural farmers, offering a lightweight, accessible platform for marketplace listings, real-time market prices, crop advisory, post-harvest guidance, and transport connections.

## 2. Project Goals

- Enable farmers to list and browse farm produce easily.
- Provide up-to-date local market price information.
- Deliver practical crop advisory and post-harvest storage tips.
- Facilitate simple transport requests and listings.
- Ensure accessibility for low-literacy, low-tech users.
- Support offline usage and multiple Indian languages.

## 3. Target Users

- Small and marginal Indian farmers (primary)
- Local produce buyers and traders
- Transport providers (secondary)
- Agricultural extension workers (secondary)

## 4. Success Criteria

- Farmers can list and discover produce with minimal steps.
- Market prices are accurate and updated in real-time.
- Advisory content is actionable and easy to understand.
- App is usable offline and in multiple local languages.
- User authentication is seamless via Google Social Login.
- UI is intuitive for users with limited tech skills.

## 5. Technical Constraints

- Mobile-first, Android-optimized (PWA or native)
- Supabase (PostgreSQL) as backend database
- Offline-first architecture (local storage, sync)
- Lightweight, low-bandwidth operation
- No hard-coded secrets or config values in codebase

## 6. Integration Points

- Google Social Login (OAuth)
- Supabase backend (auth, data, storage)
- Potential integration with government or third-party market price APIs

## 7. Non-Functional Requirements

- Performance: Fast load times, responsive UI, minimal data usage
- Security: Secure authentication, data privacy, input validation
- Scalability: Support for growing user base and data volume
- Accessibility: Usable by low-literacy users, supports local languages
- Reliability: Robust offline support, error handling, and data sync

## 8. Out of Scope

- Advanced e-commerce features (payments, logistics automation)
- Complex analytics dashboards
- Integration with non-Supabase backends

## 9. Key Stakeholders

- Farmers and farmer groups
- Local traders and buyers
- Transport providers
- Agricultural extension agencies
- App development and support team

## 10. Risks & Mitigation

- **Low digital literacy:** Prioritize simple UI, visual cues, and local language support.
- **Connectivity issues:** Ensure robust offline functionality and data sync.
- **Data accuracy:** Use reliable sources for market prices and advisory content.
- **Security/privacy:** Enforce strong authentication and data protection.