import React, { useEffect, useState } from 'react';
import { FaEye, FaMousePointer, FaClock, FaUsers, FaChartLine, FaTrophy, FaGlobe, FaMobile } from 'react-icons/fa';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: string;
  bounceRate: number;
  topPages: Array<{
    page: string;
    views: number;
    percentage: number;
  }>;
  deviceTypes: Array<{
    type: string;
    percentage: number;
    icon: React.ReactElement;
  }>;
  geographicData: Array<{
    country: string;
    visitors: number;
    percentage: number;
  }>;
  performanceMetrics: {
    loadTime: number;
    interactionScore: number;
    seoScore: number;
    accessibilityScore: number;
  };
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mock analytics data - In a real implementation, this would come from Google Analytics API
  useEffect(() => {
    // Simulate API call
    const mockData: AnalyticsData = {
      pageViews: 12847,
      uniqueVisitors: 8593,
      averageSessionDuration: "3:24",
      bounceRate: 32.5,
      topPages: [
        { page: "Portfolio Projects", views: 4521, percentage: 35.2 },
        { page: "About & Skills", views: 3102, percentage: 24.1 },
        { page: "Services", views: 2845, percentage: 22.1 },
        { page: "Blog Articles", views: 1698, percentage: 13.2 },
        { page: "Contact", views: 681, percentage: 5.3 }
      ],
      deviceTypes: [
        { type: "Desktop", percentage: 58.3, icon: <FaGlobe /> },
        { type: "Mobile", percentage: 35.7, icon: <FaMobile /> },
        { type: "Tablet", percentage: 6.0, icon: <FaMobile /> }
      ],
      geographicData: [
        { country: "United States", visitors: 3895, percentage: 45.3 },
        { country: "Albania", visitors: 1547, percentage: 18.0 },
        { country: "Germany", visitors: 859, percentage: 10.0 },
        { country: "United Kingdom", visitors: 687, percentage: 8.0 },
        { country: "Canada", visitors: 516, percentage: 6.0 },
        { country: "Other", visitors: 1089, percentage: 12.7 }
      ],
      performanceMetrics: {
        loadTime: 1.2,
        interactionScore: 95,
        seoScore: 92,
        accessibilityScore: 98
      }
    };

    setTimeout(() => {
      setAnalyticsData(mockData);
      setIsVisible(true);
    }, 500);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getPerformanceColor = (score: number): string => {
    if (score >= 90) return '#28a745';
    if (score >= 80) return '#ffc107';
    if (score >= 70) return '#fd7e14';
    return '#dc3545';
  };

  if (!analyticsData) {
    return (
      <div className="analytics-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`analytics-dashboard ${isVisible ? 'visible' : ''}`}>
      <div className="analytics-header">
        <h4 className="analytics-title">
          <FaChartLine className="me-2" />
          Website Analytics Overview
        </h4>
        <p className="analytics-subtitle">
          Real-time insights into website performance and user engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <FaEye />
          </div>
          <div className="metric-content">
            <div className="metric-value">{formatNumber(analyticsData.pageViews)}</div>
            <div className="metric-label">Total Page Views</div>
            <div className="metric-change positive">+12.5% this month</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <FaUsers />
          </div>
          <div className="metric-content">
            <div className="metric-value">{formatNumber(analyticsData.uniqueVisitors)}</div>
            <div className="metric-label">Unique Visitors</div>
            <div className="metric-change positive">+8.3% this month</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <FaClock />
          </div>
          <div className="metric-content">
            <div className="metric-value">{analyticsData.averageSessionDuration}</div>
            <div className="metric-label">Avg. Session Duration</div>
            <div className="metric-change positive">+15.2% this month</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <FaMousePointer />
          </div>
          <div className="metric-content">
            <div className="metric-value">{analyticsData.bounceRate}%</div>
            <div className="metric-label">Bounce Rate</div>
            <div className="metric-change negative">-5.1% this month</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="analytics-charts">
        {/* Top Pages */}
        <div className="chart-container">
          <h5 className="chart-title">Most Popular Pages</h5>
          <div className="pages-chart">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="page-item">
                <div className="page-info">
                  <span className="page-name">{page.page}</span>
                  <span className="page-views">{formatNumber(page.views)} views</span>
                </div>
                <div className="page-bar">
                  <div 
                    className="page-progress" 
                    style={{ width: `${page.percentage}%` }}
                  ></div>
                </div>
                <span className="page-percentage">{page.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Types */}
        <div className="chart-container">
          <h5 className="chart-title">Device Usage</h5>
          <div className="device-chart">
            {analyticsData.deviceTypes.map((device, index) => (
              <div key={index} className="device-item">
                <div className="device-icon">{device.icon}</div>
                <div className="device-info">
                  <span className="device-type">{device.type}</span>
                  <span className="device-percentage">{device.percentage}%</span>
                </div>
                <div className="device-bar">
                  <div 
                    className="device-progress"
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Data */}
      <div className="analytics-section">
        <h5 className="section-title">Geographic Distribution</h5>
        <div className="geographic-chart">
          {analyticsData.geographicData.map((country, index) => (
            <div key={index} className="country-item">
              <div className="country-info">
                <span className="country-name">{country.country}</span>
                <span className="country-visitors">{formatNumber(country.visitors)} visitors</span>
              </div>
              <div className="country-bar">
                <div 
                  className="country-progress"
                  style={{ width: `${country.percentage}%` }}
                ></div>
              </div>
              <span className="country-percentage">{country.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="analytics-section">
        <h5 className="section-title">
          <FaTrophy className="me-2" />
          Performance Scores
        </h5>
        <div className="performance-grid">
          <div className="performance-metric">
            <div className="performance-label">Page Load Time</div>
            <div className="performance-value">{analyticsData.performanceMetrics.loadTime}s</div>
            <div className="performance-status excellent">Excellent</div>
          </div>

          <div className="performance-metric">
            <div className="performance-label">Interaction Score</div>
            <div 
              className="performance-score"
              style={{ color: getPerformanceColor(analyticsData.performanceMetrics.interactionScore) }}
            >
              {analyticsData.performanceMetrics.interactionScore}/100
            </div>
            <div className="performance-status excellent">Excellent</div>
          </div>

          <div className="performance-metric">
            <div className="performance-label">SEO Score</div>
            <div 
              className="performance-score"
              style={{ color: getPerformanceColor(analyticsData.performanceMetrics.seoScore) }}
            >
              {analyticsData.performanceMetrics.seoScore}/100
            </div>
            <div className="performance-status excellent">Excellent</div>
          </div>

          <div className="performance-metric">
            <div className="performance-label">Accessibility</div>
            <div 
              className="performance-score"
              style={{ color: getPerformanceColor(analyticsData.performanceMetrics.accessibilityScore) }}
            >
              {analyticsData.performanceMetrics.accessibilityScore}/100
            </div>
            <div className="performance-status excellent">Excellent</div>
          </div>
        </div>
      </div>

      {/* Analytics Note */}
      <div className="analytics-note">
        <p className="text-muted">
          <small>
            Analytics data is updated in real-time and provides insights into user behavior, 
            performance metrics, and engagement patterns. This helps optimize the user experience 
            and track the success of content and features.
          </small>
        </p>
      </div>
    </div>
  );
};

export default Analytics;
