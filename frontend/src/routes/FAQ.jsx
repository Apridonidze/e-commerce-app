import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Question from "../components/faq/Question";

const FAQ = () => {

    const faqs = [
        {
            title: "Ordering & Products",
            items: [
            {
                question: "How do I place an order?",
                answer: "Browse the products, select the items you want, add them to your cart, and proceed to checkout. You must create an account to complete the order."
            },
            {
                question: "Can I modify or cancel my order after placing it?",
                answer: "You can only cancel an order after checkout and before it has been processed. Modifications are not allowed."
            },
            {
                question: "Do you offer product warranties or guarantees?",
                answer: "Yes, all products come with standard guarantees. Warranty details are provided on each product page."
            },
            {
                question: "Are there any special product types or restrictions?",
                answer: "No, all products follow the same standard policies."
            }
            ]
        },
        {
            title: "Payment & Billing",
            items: [
            {
                question: "What payment methods are accepted?",
                answer: "We currently accept full payments via Stripe."
            },
            {
                question: "Is it safe to use my credit/debit card on your website?",
                answer: "Yes, all payment transactions are secured with SSL encryption and processed through Stripe."
            },
            {
                question: "Can I pay in installments or use multiple payment methods?",
                answer: "No, only full payment is accepted per order."
            }
            ]
        },
        {
            title: "Shipping & Delivery",
            items: [
            {
                question: "Do you offer international shipping?",
                answer: "No, we currently only ship locally."
            },
            {
                question: "How long does delivery take?",
                answer: "Delivery typically takes up to 7 days after placing the order."
            },
            {
                question: "Are there any special shipping rules?",
                answer: "No, we do not have special shipping options at this time."
            }
            ]
        },
        {
            title: "Account & Support",
            items: [
            {
                question: "Do I need an account to place an order?",
                answer: "Yes, creating an account is required to place orders."
            },
            {
                question: "How do I contact customer support?",
                answer: "You can contact support via the built-in support chat on the website or by email at support@example.com."
            }
            ]
        },
        {
            title: "Feedback & Reports",
            items: [
            {
                question: "Can I provide feedback on products?",
                answer: "Yes, our system allows users to submit feedback and reports on products."
            },
            {
                question: "Are there any feedback restrictions?",
                answer: "Feedback should be relevant and constructive. Abusive or irrelevant reports may be removed by the admin."
            }
            ]
        }
    ];

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 
                <div className="main-body">
                    <div className="main-start"><Sidebar /></div>
                    <div className="main-end">

                        <div className="main-header"><Header /></div>

                            <h1>Frequently Asked Questions</h1>
                            <div className="faq-list-container">
                                {faqs.map(faq => <Question faq={faq}/>)}
                            </div>

                    </div>
                </div>
                <Footer />
        </div>
    )
}

export default FAQ