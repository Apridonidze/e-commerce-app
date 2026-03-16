import Sidebar from "../layout/Sidebar";

const FAQ = () => {

    const faqs = [
        {
            title: "Ordering & Products",
            items: [
            {
                question: "How do I place an order?",
                answer: "Browse the products, select the items you want, add them to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information."
            },
            {
                question: "Can I modify or cancel my order after placing it?",
                answer: "Orders can only be modified or canceled within 1 hour of placement. After that, they are processed for shipping and cannot be changed."
            },
            {
                question: "How do I track my order status?",
                answer: "You can track your order by logging into your account and checking the 'My Orders' section. You’ll also receive email updates on shipment progress."
            },
            {
                question: "Are the products shown on the website in real-time stock?",
                answer: "Yes, product availability is updated in real-time. Items may become unavailable if stock runs out before checkout."
            },
            {
                question: "Do you offer product warranties or guarantees?",
                answer: "Warranty information is provided on each product page. Most products come with a standard manufacturer warranty."
            }
            ]},
        {
            title: "Payment & Billing",
            items: [
            {
                question: "What payment methods are accepted?",
                answer: "We accept credit/debit cards, PayPal, and select local payment gateways."
            },
            {
                question: "Is it safe to use my credit/debit card on your website?",
                answer: "Yes, all payment transactions are secured with SSL encryption and processed through trusted payment gateways."
            },
            {
                question: "Can I use multiple payment options for a single order?",
                answer: "No, only one payment method can be used per order."
            },
            {
                question: "Do you offer installment or EMI options?",
                answer: "Installment options are available for selected credit cards. Check the payment page for details."
            }
            ]
        },
            {
            title: "Shipping & Delivery",
            items: [
            {
                question: "What shipping options are available?",
                answer: "We offer standard, express, and same-day delivery (where applicable)."
            },
            {
                question: "How long does delivery take?",
                answer: "Standard delivery takes 3–7 business days, and express delivery takes 1–3 business days depending on your location."
            },
            {
                question: "Do you ship internationally?",
                answer: "Currently, we ship only within the country. International shipping may be added in the future."
            },
            {
                question: "What should I do if my order hasn’t arrived?",
                answer: "Contact our support team with your order number. We will track your order and update you on the status."
            },
            {
                question: "Can I change my shipping address after ordering?",
                answer: "Shipping addresses can only be changed within 1 hour of placing an order. After that, the order is already processed for shipping."
            }
            ]
        },
        {
            title: "Returns & Refunds",
            items: [
            {
                question: "What is your return policy?",
                answer: "Items can be returned within 14 days of delivery if they are unused and in original packaging."
            },
            {
                question: "How do I request a refund or exchange?",
                answer: "Submit a return request through your account or contact customer support. Once approved, send the item back as per instructions."
            },
            {
                question: "Are there any items that cannot be returned?",
                answer: "Personalized, perishable, or digital products cannot be returned."
            },
            {
                question: "How long does it take to process a refund?",
                answer: "Refunds are processed within 5–7 business days after receiving the returned item."
            }
            ]
        },
        {
            title: "Account & Support",
            items: [
            {
                question: "Do I need an account to place an order?",
                answer: "No, you can place an order as a guest. Creating an account allows faster checkout and order tracking."
            },
            {
                question: "How do I reset my password?",
                answer: "Click on 'Forgot Password' at login and follow the instructions to reset your password via email."
            },
            {
                question: "How do I contact customer support?",
                answer: "You can contact support via email, phone, or the live chat option on the website."
            },
            {
                question: "Can I save multiple shipping addresses in my account?",
                answer: "Yes, you can add and manage multiple shipping addresses in your account settings."
            }
            ]
        }
        ];

    return(
        <div className="faq-container d-flex">
            <Sidebar />
            <div className="faq-main-container">
                <h1>Frequently Asked Questions</h1>
                <div className="faq-list-container">
                    {faqs.map((faq, faqId) => (<div className="faq" key={faqId}>
                        <h3>{faq.title}</h3>
                        <div className="faq-items">
                            {faq?.items.map((item , itemId) => (
                                <div className="faq-item" key={itemId}>
                                    <div className="faq-header d-flex justify-content-between">
                                        <h5>{item.question}</h5>
                                        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#collapseDiv${itemId}`} aria-expanded="false" aria-controls={`collapseDiv${itemId}`}>^</button>
                                    </div>
                                    <div className="collapse" id={`collapseDiv${itemId}`}>
                                        <h5>{item.answer}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    )
}

export default FAQ