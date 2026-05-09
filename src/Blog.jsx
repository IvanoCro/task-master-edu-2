import React, { useState } from 'react';
import styles from './Blog.module.css';
import Navigation from './Navigation.jsx';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "Top 5 Productivity Tips for 2026",
      date: "March 1, 2026",
      category: "Productivity",
      excerpt: "Discover the simplest ways to boost your productivity and work efficiency every day.",
      content: "Effective time management is the key to success. Use the Pomodoro Technique - work for 25 minutes, then rest for 5 minutes. Regular breaks are essential for maximum productivity. Prioritize your tasks - focus on the most important things when you have the most energy.\n\nOrganize your workspace - a clean space leads to clear thoughts. Avoid multitasking - focus is your best friend. Break large projects into smaller, manageable chunks. Track your progress to stay motivated.",
      imgUrl: `${import.meta.env.BASE_URL}img/productivity.jpg`
    },
    {
      id: 2,
      title: "How to Manage Stressful Situations",
      date: "February 28, 2026",
      category: "Wellness",
      excerpt: "Learn techniques to reduce stress and improve mental health through daily practice.",
      content: "Stress is part of life, but you can learn to manage it. Breathing exercises are a great way to calm down. Physical activity reduces stress hormones. Spend 30 minutes walking or jogging daily.\n\nMeditation is a powerful tool - start with just 5 minutes a day. Sleep is critical for mental health - aim for 7-8 hours per night. Connect with others - talking to friends and family helps reduce stress. Take breaks throughout your day.",
      imgUrl: `${import.meta.env.BASE_URL}img/stressful-situation.webp`
    },
    {
      id: 3,
      title: "Set Realistic Goals and Achieve Them",
      date: "February 25, 2026",
      category: "Personal Growth",
      excerpt: "SMART goals aren't just a trend - they are proven for success and motivation.",
      content: "Goal setting is the first step towards change. A SMART goal is: Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of vague goals, define clear outcomes.\n\nBreak large goals into smaller tasks. Track your progress regularly. Celebrate small wins along the way. Adjust your goals as needed - flexibility is important.",
      imgUrl: `${import.meta.env.BASE_URL}img/goals.jpg`
    },
    {
      id: 4,
      title: "Work-Life Balance Matters",
      date: "February 20, 2026",
      category: "Wellness",
      excerpt: "Career satisfaction is important, but health and family come first.",
      content: "Work-life balance is not a luxury - it's a necessity. Set boundaries - don't work after a certain time. Use your free time for activities that fulfill you.\n\nExercise regularly and practice mindfulness. Remember that rest is productive. Taking care of yourself improves every aspect of life.",
      imgUrl: `${import.meta.env.BASE_URL}img/balance.webp`
    },
    {
      id: 5,
      title: "Create a Routine That Changes Your Life",
      date: "February 15, 2026",
      category: "Personal Growth",
      excerpt: "Small consistent actions lead to big results - it's all about routine.",
      content: "Routine is the foundation of success. A morning routine sets the tone for the day. Keep a journal and reflect weekly.\n\nBuild habits slowly and focus on consistency. Over time, small changes create powerful results.",
      imgUrl: `${import.meta.env.BASE_URL}img/routine.png`
    },
    {
      id: 6,
      title: "Digital Detox - The Path to Better Focus",
      date: "February 10, 2026",
      category: "Productivity",
      excerpt: "Eliminate distractions and return to what matters - your productivity.",
      content: "Overusing technology reduces focus. Turn off notifications while working. Avoid social media during work hours.\n\nSpend time offline daily and create phone-free zones. Be intentional with your technology use.",
      imgUrl: `${import.meta.env.BASE_URL}img/digital-detox.webp`
    },
    {
      id: 7,
      title: "The Power of Deep Work",
      date: "February 5, 2026",
      category: "Productivity",
      excerpt: "Learn how uninterrupted focus can dramatically improve your results.",
      content: "Deep work is the ability to focus without distraction on cognitively demanding tasks. Schedule blocks of uninterrupted time.\n\nEliminate distractions and train your brain to concentrate longer. The quality of your work will significantly improve.",
      imgUrl: `${import.meta.env.BASE_URL}img/deep-work.png`
    },
    {
      id: 8,
      title: "Healthy Habits for a Better Life",
      date: "February 2, 2026",
      category: "Wellness",
      excerpt: "Simple daily habits that improve your physical and mental health.",
      content: "Drink enough water, eat balanced meals, and move your body daily. Small health habits compound over time.\n\nPrioritize sleep and mental health. Consistency is more important than intensity.",
      imgUrl: `${import.meta.env.BASE_URL}img/healthy-habits.avif`
    },
    {
      id: 9,
      title: "Time Blocking for Beginners",
      date: "January 30, 2026",
      category: "Productivity",
      excerpt: "Structure your day effectively using time blocking techniques.",
      content: "Time blocking means scheduling specific time slots for tasks. It reduces decision fatigue and increases focus.\n\nPlan your day in advance and stick to your schedule. Leave buffer time between tasks.",
      imgUrl: `${import.meta.env.BASE_URL}img/time-blocking.png`
    }
  ];

  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        <Navigation />
      </div>
      <div className={styles.blogMainContainer}>
        <header>
          <h2 className={styles.title}>Blog & News</h2>
        </header>
        <main>
          {selectedArticle ? (
            <div className={styles.articleDetail}>
              <button 
                className={styles.backArticleBtn}
                onClick={() => setSelectedArticle(null)}
              >
                ← Back to Articles
              </button>
              <div className={styles.fullArticle}>
                <span className={styles.articleCategory}>{selectedArticle.category}</span>
                <h2 className={styles.articleTitle}>{selectedArticle.title}</h2>
                <span className={styles.articleDate}>{selectedArticle.date}</span>
                <div className={styles.articleContent}>
                  {selectedArticle.content}
                </div>
                <img 
                  src={selectedArticle.imgUrl} 
                  alt={selectedArticle.title} 
                  className={styles.detailImage} 
                />
              </div>
            </div>
          ) : (
            <div className={styles.articlesList}>
              {articles.map(article => (
                <article 
                  key={article.id} 
                  className={styles.articleCard}
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className={styles.articleHeader}>
                    <span className={styles.category}>{article.category}</span>
                    <span className={styles.date}>{article.date}</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p className={styles.excerpt}>{article.excerpt}</p>
                  <img 
                    src={article.imgUrl} 
                    alt={article.title} 
                    className={styles.cardImage} 
                  />
                  <button className={styles.readMore}>Read More →</button>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}