import { useState } from 'react';
import styles from './Export.module.css';
import { Link } from 'react-router-dom';

export default function Export({ tasks = [], completedTasks = [] }) {
  const [exportStatus, setExportStatus] = useState('');

  const allTasks = [...tasks, ...completedTasks];

  // CSV Export
  const downloadCSV = () => {
    if (allTasks.length === 0) {
      setExportStatus('No tasks to export!');
      setTimeout(() => setExportStatus(''), 3000);
      return;
    }

    const headers = ['Title', 'Description', 'Due Date', 'Status', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...allTasks.map(task => [
        `"${task.title || ''}"`,
        `"${task.description || ''}"`,
        `"${task.dueDate || ''}"`,
        completedTasks.find(t => t.id === task.id) ? 'Completed' : 'To-Do',
        `"${task.createdAt || ''}"`,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `TaskMasterEdu_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
    
    setExportStatus('✓ CSV downloaded successfully!');
    setTimeout(() => setExportStatus(''), 3000);
  };

  // JSON Export (Backup)
  const downloadJSON = () => {
    if (allTasks.length === 0) {
      setExportStatus('No tasks to export!');
      setTimeout(() => setExportStatus(''), 3000);
      return;
    }

    const backup = {
      exportDate: new Date().toISOString(),
      tasks: tasks,
      completedTasks: completedTasks,
      totalTasks: allTasks.length,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `TaskMasterEdu_backup_${new Date().toISOString().split('T')[0]}.json`);
    link.click();
    
    setExportStatus('✓ JSON backup downloaded successfully!');
    setTimeout(() => setExportStatus(''), 3000);
  };

  // PDF Export (simple)
  const downloadPDF = () => {
    if (allTasks.length === 0) {
      setExportStatus('No tasks to export!');
      setTimeout(() => setExportStatus(''), 3000);
      return;
    }

    const pdfContent = [
      'TaskMasterEdu - Task Export',
      `Export Date: ${new Date().toLocaleString()}`,
      `Total Tasks: ${allTasks.length}`,
      `To-Do Tasks: ${tasks.length}`,
      `Completed Tasks: ${completedTasks.length}`,
      '',
      '='.repeat(80),
      '',
      ...allTasks.map((task, i) => [
        `${i + 1}. ${task.title}`,
        `   Description: ${task.description || 'N/A'}`,
        `   Due Date: ${task.dueDate || 'N/A'}`,
        `   Status: ${completedTasks.find(t => t.id === task.id) ? 'Completed ✓' : 'To-Do'}`,
        `   Created: ${new Date(task.createdAt).toLocaleDateString()}`,
        ''
      ].join('\n'))
    ].join('\n');

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `TaskMasterEdu_${new Date().toISOString().split('T')[0]}.txt`);
    link.click();
    
    setExportStatus('✓ Report downloaded successfully!');
    setTimeout(() => setExportStatus(''), 3000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.exportContainer}>
        <header className={styles.header}>
          <h2 className={styles.title}>Export & Backup</h2>
        </header>

        <main className={styles.main}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Total Tasks:</span>
              <span className={styles.value}>{allTasks.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>To-Do Tasks:</span>
              <span className={styles.value}>{tasks.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.label}>Completed Tasks:</span>
              <span className={styles.value}>{completedTasks.length}</span>
            </div>
          </div>

          <div className={styles.exportButtonsContainer}>
            <button 
              className={`${styles.exportBtn} ${styles.csvBtn}`}
              onClick={downloadCSV}
            >
              📄 Export as CSV
            </button>

            <button 
              className={`${styles.exportBtn} ${styles.jsonBtn}`}
              onClick={downloadJSON}
            >
              💾 Backup as JSON
            </button>

            <button 
              className={`${styles.exportBtn} ${styles.reportBtn}`}
              onClick={downloadPDF}
            >
              📋 Generate Report
            </button>
          </div>

          {exportStatus && (
            <div className={styles.statusMessage}>
              {exportStatus}
            </div>
          )}

          <div className={styles.infoBox}>
            <p><strong>📄 CSV Format:</strong> Perfect for importing into Excel, Google Sheets, or other spreadsheet applications.</p>
            <p><strong>💾 JSON Backup:</strong> Complete backup of your data. You can restore this later.</p>
            <p><strong>📋 Report:</strong> A readable text format of all your tasks with details.</p>
          </div>
        </main>

        <Link 
          className={styles.backButton}
          to="/Settings">
          Back
        </Link>
      </div>
    </div>
  );
}
