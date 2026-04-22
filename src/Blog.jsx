import React, { useState } from 'react';
import styles from './Blog.module.css';
import Navigation from './navigation.jsx';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "Top 5 Productivity Tips for 2026",
      date: "March 1, 2026",
      category: "Productivity",
      excerpt: "Discover the simplest ways to boost your productivity and work efficiency every day.",
      content: "Effective time management is the key to success. Use the Pomodoro Technique - work for 25 minutes, then rest for 5 minutes. Regular breaks are essential for maximum productivity. Prioritize your tasks - focus on the most important things when you have the most energy.\n\nOrganize your workspace - a clean space leads to clear thoughts. Avoid multitasking - focus is your best friend. Break large projects into smaller, manageable chunks. Track your progress to stay motivated."
    },
    {
      id: 2,
      title: "How to Manage Stressful Situations",
      date: "February 28, 2026",
      category: "Wellness",
      excerpt: "Learn techniques to reduce stress and improve mental health through daily practice.",
      content: "Stress is part of life, but you can learn to manage it. Breathing exercises are a great way to calm down - try our Breathing Exercise feature! Physical activity reduces stress hormones. Spend 30 minutes walking or jogging daily.\n\nMeditation is a powerful tool - start with just 5 minutes a day. Sleep is critical for mental health - aim for 7-8 hours per night. Connect with others - talking to friends and family helps reduce stress. Take breaks throughout your day."
    },
    {
      id: 3,
      title: "Set Realistic Goals and Achieve Them",
      date: "February 25, 2026",
      category: "Personal Growth",
      excerpt: "SMART goals aren't just a trend - they are proven for success and motivation.",
      content: "Goal setting is the first step towards change. A SMART goal is: Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of 'I want to be more productive,' say 'I want to complete 3 major projects by the end of the month'.\n\nBreak large goals into smaller tasks - that's exactly what TaskMasterEdu does for you! Track your progress using our Statistics section. Celebrate small wins along the way. Adjust your goals as needed - flexibility is important."
    },
    {
      id: 4,
      title: "Work-Life Balance Matters",
      date: "February 20, 2026",
      category: "Wellness",
      excerpt: "Career satisfaction is important, but health and family come first.",
      content: "Work-life balance is not a luxury - it's a necessity. Set boundaries - don't work after a certain time. Use your free time for activities that fulfill you. Spending time with family and friends is crucial for mental health.\n\nExercise regularly - physical activity reduces stress and improves mood. Practice mindfulness - be present in the moment instead of worrying about the future. Remember that rest is productive. Taking care of yourself makes you better at everything."
    },
    {
      id: 5,
      title: "Create a Routine That Changes Your Life",
      date: "February 15, 2026",
      category: "Personal Growth",
      excerpt: "Small consistent actions lead to big results - it's all about routine.",
      content: "Routine is the foundation of success. A morning routine sets the tone for the day - try: waking up at the same time, exercising, eating a healthy breakfast. Challenge yourself - each day, try to be a little better than yesterday.\n\nKeep a journal - write about your feelings and accomplishments. Reflection is powerful - each week, review what went well and what can improve. Build habits slowly - add one new habit at a time. Consistency beats perfection."
    },
    {
      id: 6,
      title: "Digital Detox - The Path to Better Focus",
      date: "February 10, 2026",
      category: "Productivity",
      excerpt: "Eliminate distractions and return to what matters - your productivity.",
      content: "Overusing technology reduces focus. Turn off notifications while working - check messages every hour instead. Avoid social media during work hours. Use apps like TaskMasterEdu for structure, not distraction.\n\nSpend at least 1 hour daily without your phone. You'll find your focus improves and stress decreases. Set phone-free zones in your home - like the dinner table. Be intentional with your technology use. Quality over quantity applies to digital life too."
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
