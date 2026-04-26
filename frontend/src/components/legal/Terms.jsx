const Terms = () => {
    return(
        <div className="legal-component">

            <div className="d-flex my-3 justify-content-between gap-2 text-break">
                <h1 className="fw-bold ">Terms of Service</h1>
                <p><strong>Last updated:</strong> January 1, 2026</p>
            </div>

            <h3 className="fw-bold">1. Eligibility</h3>
            <p>Users must be at least <strong>13 years old</strong> to create an account and use this platform.</p>

            <h3 className="fw-bold">2. Accounts</h3>
            <p>When creating an account, users must provide accurate information. Accounts store the following data:</p>

            <ul>
                <li>Full name</li>
                <li>Email address</li>
                <li>Password</li>
                <li>Phone number</li>
                <li>Account creation date</li>
            </ul>

            <p>Users are responsible for maintaining the confidentiality of their login credentials.</p>

            <h3 className="fw-bold">3. Orders</h3>
            <p>When placing an order on the platform:</p>

            <ul>
                <li>Orders can be <strong>cancelled after checkout</strong>.</li>
                <li>Orders <strong>cannot be modified once placed</strong>.</li>
                <li>
                Orders are currently <strong>non-refundable</strong>, although refund policies may change in the future.
                </li>
            </ul>

            <h3 className="fw-bold">4. Payments</h3>
            <p>Payments are processed through <strong>Stripe</strong>. E Commerce App <strong>does not store any payment card information locally</strong>.</p>

            <h3 className="fw-bold">5. Shipping</h3>

            <ul>
                <li>Shipping is currently <strong>available only locally</strong>.</li>
                <li>Standard delivery time is approximately <strong>7 days after ordering</strong>.</li>
            </ul>

            <p>Delivery times may vary depending on logistical conditions.</p>

            <h3 className="fw-bold">6. Product Listings</h3>
            <p>All products sold on the platform are <strong>provided and managed by E Commerce App</strong>.</p>

            <p>Products are moderated internally and may also be reviewed through user reports.</p>

            <h3 className="fw-bold">7. Reviews and Feedback</h3>

            <p>Users may submit:</p>

            <ul>
                <li>Product reviews</li>
                <li>Platform feedback</li>
                <li>Reports about products or platform issues</li>
            </ul>

            <p>E Commerce App reserves the right to remove any content that violates platform rules.</p>

            <h3 className="fw-bold">8. Reporting System</h3>

            <p>Users may report:</p>

            <ul>
                <li>Product issues</li>
                <li>Platform problems</li>
                <li>Other concerns affecting platform functionality</li>
            </ul>

            <p>All reports are reviewed by administrators.</p>

            <h3 className="fw-bold">9. Prohibited Use</h3>

            <p>Users may not:</p>

            <ul>
                <li>Attempt unauthorized access to platform systems</li>
                <li>Interfere with platform functionality</li>
                <li>Submit fraudulent orders</li>
                <li>Abuse reporting or feedback systems</li>
            </ul>

            <p>Violation of these rules may result in account suspension.</p>

            <h3 className="fw-bold">10. Account Termination</h3>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms of Service.</p>

            <h3 className="fw-bold">11. Changes to Terms</h3>
            <p>These Terms may be updated periodically. Continued use of the platform indicates acceptance of the revised terms.</p>

            <h3 className="fw-bold">12. Governing Law</h3>
            <p>These Terms are governed by the laws of <strong>Georgia</strong>.</p>

            <h3 className="fw-bold">13. Contact</h3>
            <p>For support or inquiries:</p>

            <p>Email:<a href="mailto:support@example.com">support@example.com</a></p>
        </div>
    )
}

export default Terms