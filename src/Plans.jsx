import React from 'react';
import styles from './Plans.module.css';
import Navigation from './navigation.jsx';

export default function Plans() {
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "Free",
      description: "Everything you need to get started",
      color: "basic",
      features: [
        "Task Management",
        "Statistics & Analytics",
        "Settings & Customization",
        "Blog & Articles",
        "Breathing Exercises",
        "Progress Tracking",
        "Community Support"
      ],
      cta: "You are here",
      highlighted: false
    },
    {
      id: 2,
      name: "Premium Plan",
      price: "$4.99",
      period: "/month",
      description: "Everything in Basic + AI features",
      color: "premium",
      features: [
        "All Basic Features",
        "AI Chatbot Assistant",
        "Smart Task Suggestions",
        "AI-Powered Productivity Insights",
        "Priority Support",
        "Advanced Analytics",
        "Personalized Recommendations"
      ],
      cta: "Upgrade Now",
      highlighted: true
    }
  ];

  return (
    <div className={styles.wrapper}>

      <div className={styles.navContainer}>
        <Navigation />
      </div>

      <main className={styles.mainContainer}>

        <header className={styles.header}>
          <h2 className={styles.title}>Choose Your Plan</h2>
          <p className={styles.subtitle}>
            Select the plan that works best for you
          </p>
        </header>

        <div className={styles.plansList}>
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${styles[plan.color]}`}
            >

              {plan.highlighted && (
                <span className={styles.badge}>Most Popular</span>
              )}

              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>

                <div className={styles.priceSection}>
                  <span className={styles.price}>{plan.price}</span>
                  {plan.period && (
                    <span className={styles.period}>{plan.period}</span>
                  )}
                </div>

                <p className={styles.description}>
                  {plan.description}
                </p>
              </div>

              <ul className={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles.feature}>
                    <span className={styles.checkmark}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={styles.ctaButton}>
                {plan.cta}
              </button>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
}