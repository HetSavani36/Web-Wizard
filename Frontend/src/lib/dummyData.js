export const dummyUsers = {
  currentUser: {
    id: 1,
    username: "techexplorer",
    email: "user@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    bio: "Passionate about technology and innovation. Love sharing insights!",
    points: 2450,
    badges: ["Early Adopter", "Top Commenter", "Bookworm"],
    favoriteCategories: ["Technology", "AI", "Web Development"],
    joinedDate: "2024-01-15",
    postsRead: 156,
    commentsCount: 89,
    bookmarksCount: 23
  }
};

export const dummyPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    content: `
    <h2>Introduction</h2>
    <p>Artificial Intelligence is revolutionizing web development in unprecedented ways. From automated code generation to intelligent design systems, AI is becoming an integral part of how we build and maintain web applications.</p>
    
    <h2>Key Areas of Impact</h2>
    <p>AI is transforming several key areas of web development:</p>
    <ul>
      <li><strong>Code Generation:</strong> Tools like GitHub Copilot are helping developers write code faster</li>
      <li><strong>Testing Automation:</strong> AI can automatically generate and run tests</li>
      <li><strong>Performance Optimization:</strong> Machine learning algorithms optimize loading times</li>
      <li><strong>User Experience:</strong> AI personalizes user interactions and content</li>
    </ul>
    
    <h2>The Road Ahead</h2>
    <p>As we look to the future, AI will continue to reshape web development. Developers who embrace these tools will find themselves more productive and capable of creating more sophisticated applications.</p>
    `,
    summary: "AI is transforming web development through automated code generation, intelligent testing, performance optimization, and personalized user experiences.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b665?w=100&h=100&fit=crop&crop=face",
      id: 2
    },
    category: "Technology",
    tags: ["AI", "Web Development", "Future Tech"],
    upvotes: 142,
    downvotes: 8,
    views: 1205,
    readTime: "5 min read",
    publishedAt: "2024-09-25T10:30:00Z",
    comments: [
      {
        id: 1,
        author: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        content: "This is a fantastic overview of AI in web development! I've been using Copilot for months and it's incredible how much it speeds up development.",
        likes: 12,
        publishedAt: "2024-09-25T11:15:00Z",
        replies: [
          {
            id: 11,
            author: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b665?w=100&h=100&fit=crop&crop=face",
            content: "Thanks Alex! Copilot is indeed a game-changer. Have you tried any other AI tools for testing?",
            likes: 5,
            publishedAt: "2024-09-25T12:00:00Z"
          }
        ]
      },
      {
        id: 2,
        author: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        content: "Great insights! I'm particularly interested in AI-powered performance optimization. Any specific tools you'd recommend?",
        likes: 8,
        publishedAt: "2024-09-25T14:22:00Z",
        replies: []
      }
    ]
  },
  {
    id: 2,
    title: "Building Scalable React Applications",
    content: `
    <h2>Introduction</h2>
    <p>Building scalable React applications requires careful planning and adherence to best practices. In this comprehensive guide, we'll explore the key strategies for creating React apps that can grow with your business needs.</p>
    
    <h2>Architecture Principles</h2>
    <p>A scalable React application should follow these principles:</p>
    <ul>
      <li><strong>Component Reusability:</strong> Create modular, reusable components</li>
      <li><strong>State Management:</strong> Use proper state management solutions</li>
      <li><strong>Code Splitting:</strong> Implement lazy loading and code splitting</li>
      <li><strong>Performance Optimization:</strong> Optimize rendering and bundle size</li>
    </ul>
    
    <h2>Best Practices</h2>
    <p>Following these practices will ensure your React application remains maintainable and scalable as it grows.</p>
    `,
    summary: "Learn essential strategies for building scalable React applications including component architecture, state management, and performance optimization.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      id: 3
    },
    category: "Web Development",
    tags: ["React", "JavaScript", "Architecture"],
    upvotes: 98,
    downvotes: 3,
    views: 856,
    readTime: "8 min read",
    publishedAt: "2024-09-24T15:45:00Z",
    comments: []
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use What",
    content: `
    <h2>Understanding the Basics</h2>
    <p>CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Understanding when to use each is crucial for creating efficient and maintainable layouts.</p>
    
    <h2>CSS Grid</h2>
    <p>CSS Grid is perfect for:</p>
    <ul>
      <li>Two-dimensional layouts</li>
      <li>Complex grid systems</li>
      <li>Overlapping elements</li>
      <li>Responsive design patterns</li>
    </ul>
    
    <h2>Flexbox</h2>
    <p>Flexbox excels at:</p>
    <ul>
      <li>One-dimensional layouts</li>
      <li>Centering content</li>
      <li>Distributing space</li>
      <li>Aligning items</li>
    </ul>
    `,
    summary: "Compare CSS Grid and Flexbox to understand when to use each layout system for optimal web design results.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    author: {
      name: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      id: 4
    },
    category: "CSS",
    tags: ["CSS", "Layout", "Design"],
    upvotes: 76,
    downvotes: 2,
    views: 643,
    readTime: "6 min read",
    publishedAt: "2024-09-23T09:20:00Z",
    comments: []
  }
];

export const dummyCategories = [
  { id: 1, name: "Technology", count: 45, color: "bg-blue-500", icon: "💻" },
  { id: 2, name: "Web Development", count: 32, color: "bg-green-500", icon: "🌐" },
  { id: 3, name: "AI", count: 28, color: "bg-purple-500", icon: "🤖" },
  { id: 4, name: "CSS", count: 21, color: "bg-pink-500", icon: "🎨" },
  { id: 5, name: "JavaScript", count: 38, color: "bg-yellow-500", icon: "⚡" },
  { id: 6, name: "React", count: 29, color: "bg-cyan-500", icon: "⚛️" }
];

export const leaderboardData = [
  { id: 1, username: "techexplorer", points: 2450, badges: 3, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face", rank: 1 },
  { id: 2, username: "codemaster", points: 2180, badges: 4, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rank: 2 },
  { id: 3, username: "devguru", points: 1950, badges: 2, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b665?w=100&h=100&fit=crop&crop=face", rank: 3 }
];
