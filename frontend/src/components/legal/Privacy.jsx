const Privacy = () => {
    return(
        <div className="legal-component">
            <h2 className="fw-bold">Privacy Policy</h2>
            <p><strong>Last updated:</strong> January 1, 2026</p>
            <p>E Commerce App respects your privacy and is committed to protecting your personal information.</p>

            <h3 className="fw-bold">1. Information We Collect</h3>
            <p>When users create an account, we collect:</p>

            <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Password</li>
                <li>Phone number</li>
                <li>Account creation date</li>
            </ul>

            <h3 className="fw-bold">2. Payment Information</h3>
            <p>Payments are processed securely through <strong>Stripe</strong>.</p>
            <p>E Commerce App <strong>does not store credit card or payment details</strong> on its servers.</p>

            <h3 className="fw-bold">3. Cookies and Authentication</h3>
            <p>The platform uses <strong>JWT authentication cookies</strong> to maintain user sessions and secure access to accounts.</p>
            <p>These cookies are required for login and account functionality.</p>

            <h3 className="fw-bold">4. How We Use Your Information</h3>
            <p>Collected information may be used to:</p>

            <ul>
                <li>Create and manage user accounts</li>
                <li>Process orders</li>
                <li>Provide customer support</li>
                <li>Improve platform functionality</li>
                <li>Investigate reports and feedback</li>
            </ul>

            <h3 className="fw-bold">5. Reviews and User Content</h3>
            <p>Users may submit:</p>

            <ul>
                <li>Product reviews</li>
                <li>Platform feedback</li>
                <li>Reports</li>
            </ul>

            <p>This content may be reviewed by administrators for moderation and service improvement.</p>

            <h3 className="fw-bold">6. Data Sharing</h3>
            <p>We do not sell or rent user personal information.</p>
            <p>Information may be shared with trusted service providers only when necessary for operating the platform(such as payment processing).</p>

            <h3 className="fw-bold">7. Data Security</h3>
            <p>Reasonable security measures are implemented to protect stored user information.However, no internet service can guarantee complete security.</p>

            <h3 className="fw-bold">8. Children's Privacy</h3>
            <p>The platform is intended for users <strong>13 years and older</strong>. We do not knowingly collectpersonal data from children under 13.</p>

            <h3 className="fw-bold">9. Policy Updates</h3>
            <p>This Privacy Policy may be updated periodically. Changes will be reflected on this page.</p>

            <h3 className="fw-bold">10. Contact</h3>

            <p>If you have questions about this Privacy Policy:</p>
            <p>Email:<a href="mailto:privacy@example.com">privacy@example.com</a></p>

        </div>
    );
};

export default Privacy;