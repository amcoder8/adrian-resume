import React, { useState } from 'react';
import { FaCalendar, FaClock, FaTag, FaEye, FaComment, FaShare, FaBookmark, FaArrowRight } from 'react-icons/fa';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  views: number;
  comments: number;
  image: string;
}

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Sample blog posts - replace with real content
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Tourism Technology: Building Immersive Digital Experiences",
      excerpt: "Exploring how modern web technologies are transforming the tourism industry, from virtual tours to seamless booking experiences.",
      content: `
        The tourism industry is experiencing a digital renaissance. As a web developer specializing in tourism platforms, I've witnessed firsthand how technology is reshaping how travelers discover, plan, and experience destinations.

        ## Virtual Reality and 3D Experiences
        
        One of the most exciting developments is the integration of virtual reality and 3D visualization. Projects like Visit Kelcyra demonstrate how we can transport users to destinations before they even book their trip. By implementing Spline 3D models and immersive galleries, we create emotional connections that drive bookings.

        ## Seamless User Journeys
        
        Modern tourism websites must prioritize user experience above all else. Every click should feel intuitive, every transition smooth. In my work with AWE Chicago, we focused on creating frictionless booking flows that convert browsers into bookers.

        ## Mobile-First Approach
        
        With over 60% of travel research happening on mobile devices, responsive design isn't optional—it's essential. Tourism platforms must perform flawlessly across all devices, maintaining visual appeal and functionality.

        ## The Role of AI and Personalization
        
        Artificial intelligence is enabling unprecedented personalization in travel recommendations. By analyzing user behavior and preferences, we can create tailored experiences that feel uniquely crafted for each visitor.

        ## Conclusion
        
        The future of tourism technology lies in creating human-centered digital experiences that inspire, inform, and convert. As we continue to push the boundaries of what's possible on the web, the key is balancing innovation with usability.
      `,
      author: "Adrian Selmani",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "Technology",
      tags: ["Tourism", "Web Development", "UX Design", "3D Technology"],
      featured: true,
      views: 1847,
      comments: 23,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "React Performance Optimization: Lessons from Real-World Projects",
      excerpt: "Deep dive into React optimization techniques I've used to improve performance across multiple client projects.",
      content: `
        Performance optimization in React applications is both an art and a science. Through my work on various client projects, I've discovered patterns and techniques that consistently deliver results.

        ## Component Optimization Strategies
        
        The foundation of React performance lies in smart component design. Using React.memo, useMemo, and useCallback strategically can prevent unnecessary re-renders and improve user experience.

        ## Code Splitting and Lazy Loading
        
        Modern applications benefit significantly from code splitting. By implementing dynamic imports and React.lazy, we can reduce initial bundle sizes and improve loading times.

        ## State Management Best Practices
        
        Choosing the right state management solution—whether it's Context API, Redux, or Zustand—can make or break your application's performance. Each has its place depending on the use case.

        ## Real-World Results
        
        In the Daymaker Salon project, these optimizations resulted in a 40% improvement in Lighthouse scores and significantly better user engagement metrics.
      `,
      author: "Adrian Selmani",
      date: "2024-12-08",
      readTime: "6 min read",
      category: "Development",
      tags: ["React", "Performance", "JavaScript", "Optimization"],
      featured: false,
      views: 1203,
      comments: 18,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Building Scalable SCSS Architecture for Large Applications",
      excerpt: "How to structure SCSS for maintainability and scalability in enterprise-level web applications.",
      content: `
        As applications grow in complexity, so does the challenge of maintaining clean, scalable CSS. Here's my approach to SCSS architecture that has proven successful across multiple large-scale projects.

        ## The 7-1 Pattern Foundation
        
        Starting with the 7-1 pattern provides a solid foundation: base, components, layout, pages, themes, abstracts, and vendors. This structure promotes organization and maintainability.

        ## Component-Driven Styling
        
        Each React component should have its corresponding SCSS file. This approach ensures styles are modular, reusable, and easy to maintain.

        ## Design System Integration
        
        Creating a comprehensive design system with variables, mixins, and functions ensures consistency across the entire application. This is particularly important for maintaining brand identity.

        ## Performance Considerations
        
        Optimizing SCSS compilation and implementing critical CSS extraction can significantly improve loading times. Tools like PurgeCSS help eliminate unused styles in production.
      `,
      author: "Adrian Selmani",
      date: "2024-12-01",
      readTime: "5 min read",
      category: "Design",
      tags: ["SCSS", "CSS Architecture", "Design Systems", "Frontend"],
      featured: false,
      views: 892,
      comments: 12,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Albanian Heritage in Digital Design: Cultural Authenticity in Modern Web Experiences",
      excerpt: "Exploring how cultural heritage can be authentically represented in contemporary web design while maintaining modern usability.",
      content: `
        As an Albanian developer, I've always been passionate about representing our rich cultural heritage in digital spaces. This intersection of tradition and technology presents unique opportunities and challenges.

        ## Color Psychology and Cultural Significance
        
        The Albanian flag's red (#E41E20) isn't just a color—it's a symbol of strength, courage, and national pride. Incorporating this into web design requires careful consideration of color psychology and accessibility.

        ## Typography and Cultural Elements
        
        Balancing modern typography with cultural references requires nuance. The goal is to honor heritage while ensuring readability and contemporary appeal.

        ## Storytelling Through Design
        
        Albanian culture is rich with stories, traditions, and values. Web design becomes a medium for storytelling, whether through imagery, animations, or user journey design.

        ## Global Appeal with Local Roots
        
        The challenge lies in creating designs that resonate globally while maintaining authentic cultural elements. This balance is crucial for representing Albanian businesses and tourism on the world stage.

        ## Case Study: Visit Kelcyra
        
        In developing the Visit Kelcyra platform, we integrated traditional Albanian design elements with modern web standards, creating an experience that feels both familiar to locals and inviting to international visitors.
      `,
      author: "Adrian Selmani",
      date: "2024-11-28",
      readTime: "7 min read",
      category: "Culture",
      tags: ["Cultural Design", "Albanian Heritage", "Tourism", "Identity"],
      featured: true,
      views: 2156,
      comments: 31,
      image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&h=400&fit=crop"
    }
  ];

  const categories = ['All', 'Technology', 'Development', 'Design', 'Culture'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="blog" className="blog-section py-5">
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="section-title mb-3">
              <span className="text-primary">Insights</span> & Thoughts
            </h2>
            <p className="section-subtitle">
              Sharing knowledge, experiences, and perspectives on web development, 
              design, and the intersection of technology with culture and business.
            </p>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="mb-4">Featured Articles</h3>
            <div className="row">
              {featuredPosts.map((post) => (
                <div key={post.id} className="col-lg-6 mb-4">
                  <div className="blog-card featured-post" onClick={() => openPost(post)}>
                    <div className="blog-image">
                      <img src={post.image} alt={post.title} />
                      <div className="blog-category">{post.category}</div>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span><FaCalendar className="me-1" /> {post.date}</span>
                        <span><FaClock className="me-1" /> {post.readTime}</span>
                        <span><FaEye className="me-1" /> {post.views}</span>
                      </div>
                      <h4 className="blog-title">{post.title}</h4>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <div className="blog-tags">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="blog-tag">
                            <FaTag className="me-1" /> {tag}
                          </span>
                        ))}
                      </div>
                      <div className="blog-footer">
                        <div className="blog-engagement">
                          <span><FaComment className="me-1" /> {post.comments}</span>
                        </div>
                        <div className="read-more">
                          Read More <FaArrowRight className="ms-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="blog-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              {filteredPosts.map((post) => (
                <div key={post.id} className="col-md-6 mb-4">
                  <div className="blog-card" onClick={() => openPost(post)}>
                    <div className="blog-image">
                      <img src={post.image} alt={post.title} />
                      <div className="blog-category">{post.category}</div>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span><FaCalendar className="me-1" /> {post.date}</span>
                        <span><FaClock className="me-1" /> {post.readTime}</span>
                      </div>
                      <h5 className="blog-title">{post.title}</h5>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <div className="blog-footer">
                        <div className="blog-engagement">
                          <span><FaEye className="me-1" /> {post.views}</span>
                          <span><FaComment className="ms-2" /> {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="blog-sidebar">
              {/* Recent Posts */}
              <div className="sidebar-widget">
                <h5 className="widget-title">Recent Posts</h5>
                <div className="recent-posts">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="recent-post" onClick={() => openPost(post)}>
                      <div className="recent-post-image">
                        <img src={post.image} alt={post.title} />
                      </div>
                      <div className="recent-post-content">
                        <h6 className="recent-post-title">{post.title}</h6>
                        <div className="recent-post-meta">
                          <span><FaCalendar className="me-1" /> {post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="sidebar-widget">
                <h5 className="widget-title">Popular Topics</h5>
                <div className="tag-cloud">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
                    <span key={tag} className="tag-cloud-item">
                      <FaTag className="me-1" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="sidebar-widget newsletter-widget">
                <h5 className="widget-title">Stay Updated</h5>
                <p>Get notified about new articles and insights.</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Your email address" className="form-control mb-2" />
                  <button type="submit" className="btn btn-primary w-100">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="blog-modal-overlay" onClick={closePost}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal-header">
              <button className="close-btn" onClick={closePost}>×</button>
            </div>
            <div className="blog-modal-content">
              <div className="blog-modal-image">
                <img src={selectedPost.image} alt={selectedPost.title} />
              </div>
              <div className="blog-modal-body">
                <div className="blog-modal-meta">
                  <span className="category-badge">{selectedPost.category}</span>
                  <div className="meta-info">
                    <span><FaCalendar className="me-1" /> {selectedPost.date}</span>
                    <span><FaClock className="me-1" /> {selectedPost.readTime}</span>
                    <span><FaEye className="me-1" /> {selectedPost.views}</span>
                    <span><FaComment className="me-1" /> {selectedPost.comments}</span>
                  </div>
                </div>
                <h1 className="blog-modal-title">{selectedPost.title}</h1>
                <div className="blog-modal-author">
                  By {selectedPost.author}
                </div>
                <div className="blog-modal-text">
                  {selectedPost.content.split('\n').map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/## (.*)/g, '<h3>$1</h3>') }} />
                  ))}
                </div>
                <div className="blog-modal-tags">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="blog-tag">
                      <FaTag className="me-1" /> {tag}
                    </span>
                  ))}
                </div>
                <div className="blog-modal-actions">
                  <button className="action-btn">
                    <FaBookmark className="me-1" /> Bookmark
                  </button>
                  <button className="action-btn">
                    <FaShare className="me-1" /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
