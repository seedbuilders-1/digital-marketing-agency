export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  hero: {
    headline: string;
    subheadline: string;
    heroImage: string;
    rating: number;
  };
  strategy: {
    title: string;
    description: string;
    image: string;
  };
  cta: {
    title: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: Array<{
      id: string;
      name: string;
      price: string;
      period: string;
      description: string;
      popular?: boolean;
      features: string[];
    }>;
  };
  caseStudies: {
    title: string;
    subtitle: string;
    studies: Array<{
      title: string;
      subtitle: string;
      image: string;
      results?: string;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    reviews: Array<{
      rating: number;
      text: string;
      author: {
        name: string;
        role: string;
        company: string;
        avatar: string;
      };
    }>;
  };
  faq: {
    title: string;
    subtitle: string;
    image: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  seo: {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    category: "SEO",
    hero: {
      headline: "Don't let your competitors capture all the attention.",
      subheadline:
        "Invest in Search Engine Optimization and position your business where your customers are looking. Discover your SEO potential today!",
      heroImage: "/service-images/seo-hero-main.png",
      rating: 5,
    },
    strategy: {
      title: "Drive Free, Qualified Traffic with Proven SEO Strategies",
      description:
        "Our SEO service helps your website earn its way to the top of search results. We audit your site and researching the best keywords for your business. Then we optimize your content, fix technical issues, and build quality backlinks. With our expertise and consistent monthly work, you'll see your website climb higher in search results. This means more free, qualified visitors coming to your site, more inquiries, and ultimately, more sales.",
      image: "/service-images/seo-strategy.png",
    },
    cta: {
      title:
        "Let's make your website rank higher and attract the right audience without spending more on ads.",
    },
    pricing: {
      title: "Choose Your Plan",
      subtitle:
        "Whether you're just starting or scaling up, we have the right plan for you",
      plans: [
        {
          id: "basic",
          name: "Basic Package",
          price: "₦150,000",
          period: "/month",
          description: "For new businesses",
          features: [
            "Initial Website Audit (technical check, basic content review)",
            "Basic Keyword Research (up to 10 keywords)",
            "Google My Business Optimization (for local search)",
            "Monthly Performance Snapshot Report (key ranking changes, organic traffic)",
            "Delivery Timeline: Initial setup and optimization completed within 2-3 weeks. Ongoing monitoring and reporting are monthly.",
          ],
        },
        {
          id: "standard",
          name: "Standard Package",
          price: "₦350,000",
          period: "/month",
          description: "For growing businesses",
          popular: true,
          features: [
            "Initial Website Audit (technical check, basic content review)",
            "Expanded Keyword Research (up to 50 keywords, including long-tail)",
            "On-Page SEO for 10 pages (content optimization for new content)",
            "Google My Business Optimization (for local search)",
            "Basic Content Strategy recommendations for SEO (topics, structure)",
            "Foundational Link Building Research for 3-5 quality backlinks/month",
            "Competitor SEO Analysis (up to 2 competitors)",
            "Monthly In-depth Performance Report & 30-min Consultation",
            "Basic Technical SEO Improvements (e.g., broken links, sitemap optimization)",
            "Delivery Timeline: Initial setup and comprehensive optimization completed within 3-4 weeks. Content optimization, link building, and reporting are monthly.",
          ],
        },
        {
          id: "premium",
          name: "Premium Package",
          price: "₦650,000",
          period: "/month",
          description: "For established businesses",
          features: [
            "Extensive Keyword Research & Opportunity Mapping (comprehensive industry analysis)",
            "Full On-Page SEO Optimization and continuous refinement for all key pages",
            "Advanced Content Strategy & Planning (full content calendar support, content gap analysis)",
            "Google My Business Optimization (for local search)",
            "Aggressive & High-Quality Link Building (customized strategy for 8-15 quality backlinks monthly)",
            "In-Depth Competitor Analysis (full landscape review, actionable insights)",
            "Advanced Technical SEO Audit & Ongoing Maintenance (crawl budget, schema markup, site speed optimization)",
            "Quarterly SEO Strategy Review Session (1 hour)",
            "Online Reputation & SERP (Search Engine Reputation Management) integration for search visibility",
            "Delivery Timeline: Initial in-depth audit and strategy development completed within 4-6 weeks. This is followed by continuous, intensive monthly optimization, link building, and reporting.",
          ],
        },
      ],
    },
    caseStudies: {
      title: "CASE Studies",
      subtitle: "Check out our case studies",
      studies: [
        {
          title: "Mama Caro's Kitchen",
          subtitle: "Local Restaurant, Lagos",
          image: "/service-images/case-study-mama-caro.png",
          results: "300% increase in local search visibility",
        },
        {
          title: "Sique Threads Boutique",
          subtitle: "Online Fashion Store, Abuja",
          image: "/service-images/case-study-sique.png",
          results: "250% increase in organic traffic",
        },
        {
          title: "Enervia Solutions",
          subtitle: "Renewable Energy Provider, Nationwide",
          image: "/service-images/case-study-enervia.png",
          results: "400% increase in qualified leads",
        },
      ],
    },
    testimonials: {
      title: "Testimonials",
      subtitle:
        "What Our Clients Say About Our Search Engine Optimization Service",
      reviews: [
        {
          rating: 5,
          text: "We was practically invisible on Google. After their SEO work, we saw our key terms hit the first page. The increase in organic traffic has been phenomenal.",
          author: {
            name: "Sarah O.",
            role: "CEO",
            company: "Lagos Food Express",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          rating: 5,
          text: "Their reporting is so clear and easy to understand. We can see exactly how our rankings are progressing and the direct impact on our website traffic. It's great to work with an SEO team that's so transparent and results-driven.",
          author: {
            name: "Kunle A.",
            role: "Head of E-commerce",
            company: "Afri Boutique",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          rating: 5,
          text: "We invested in their content strategy for time. Our blog articles now consistently target high-value keywords, establishing us as an authority and brought us high-quality leads.",
          author: {
            name: "Tunde B.",
            role: "Marketing Manager",
            company: "Nigeria Crop",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
      ],
    },
    faq: {
      title: "FAQs",
      subtitle:
        "Get quick solutions to popular questions in our FAQ, giving you essential info at a glance.",
      image: "/service-images/faq-image.png",
      questions: [
        {
          question: "How long does it take to see SEO results in Nigeria?",
          answer:
            "SEO is a long-term strategy, not a quick fix. You might start seeing small improvements in within 3 months, but significant results often take 6-12 months or even longer, depending on your industry and competition. Consistency is key.",
        },
        {
          question: "Will SEO guarantee my website is number one on Google?",
          answer:
            "No legitimate SEO service can guarantee #1 rankings. Google's algorithm considers hundreds of factors, and rankings fluctuate constantly. We focus on sustainable, long-term growth and improved visibility.",
        },
        {
          question: "What's the difference between SEO and Paid Ads (PPC)?",
          answer:
            "SEO focuses on organic (free) search results and takes time to build, while PPC provides immediate visibility but requires ongoing ad spend. SEO offers long-term value, while PPC stops working when you stop paying.",
        },
        {
          question:
            "If my business only has a physical store . Do I still need SEO?",
          answer:
            "Local SEO is crucial for physical businesses. When people search for services 'near me' or in your city, you want to appear in those results. Many customers research online before visiting stores.",
        },
        {
          question: "Do I need a new website for SEO to work?",
          answer:
            "Not necessarily. We can optimize most existing websites. However, if your site has major technical issues, is not mobile-friendly, or loads very slowly, we might recommend improvements or rebuilding for better results.",
        },
      ],
    },
  },
  "social-media-marketing": {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    category: "Social Media",
    hero: {
      headline: "Don't let your brand get lost in the social media noise.",
      subheadline:
        "Build a strong social media presence that engages your audience and drives real business results. Connect with your customers where they spend their time!",
      heroImage: "/service-images/social-media-hero.png",
      rating: 5,
    },
    strategy: {
      title:
        "Build Authentic Connections with Strategic Social Media Marketing",
      description:
        "Our social media marketing service helps you build meaningful relationships with your audience across all major platforms. We create engaging content, manage your communities, and run targeted campaigns that convert followers into customers. With consistent posting, strategic hashtag use, and data-driven insights, you'll see increased brand awareness, higher engagement rates, and more qualified leads coming through your social channels.",
      image: "/service-images/social-media-strategy.png",
    },
    cta: {
      title:
        "Let's build your social media presence and turn followers into loyal customers.",
    },
    pricing: {
      title: "Choose Your Plan",
      subtitle:
        "Whether you're just starting or scaling up, we have the right plan for you",
      plans: [
        {
          id: "basic",
          name: "Basic Package",
          price: "₦120,000",
          period: "/month",
          description: "For new businesses",
          features: [
            "Social Media Audit (2 platforms)",
            "Content Calendar (12 posts per month)",
            "Basic Graphic Design (templates)",
            "Community Management (response to comments/DMs)",
            "Monthly Performance Report",
          ],
        },
        {
          id: "standard",
          name: "Standard Package",
          price: "₦280,000",
          period: "/month",
          description: "For growing businesses",
          popular: true,
          features: [
            "Social Media Audit (4 platforms)",
            "Content Calendar (24 posts per month)",
            "Custom Graphic Design",
            "Community Management (active engagement)",
            "Hashtag Research & Strategy",
            "Basic Paid Advertising (₦50,000 ad spend included)",
            "Bi-weekly Performance Reports",
            "Competitor Analysis",
          ],
        },
        {
          id: "premium",
          name: "Premium Package",
          price: "₦500,000",
          period: "/month",
          description: "For established businesses",
          features: [
            "Full Social Media Management (all platforms)",
            "Content Calendar (40+ posts per month)",
            "Professional Video Content Creation",
            "Advanced Community Management",
            "Influencer Outreach & Partnerships",
            "Advanced Paid Advertising (₦100,000 ad spend included)",
            "Weekly Performance Reports & Strategy Calls",
            "Crisis Management Support",
            "Social Commerce Setup",
          ],
        },
      ],
    },
    caseStudies: {
      title: "CASE Studies",
      subtitle: "Check out our case studies",
      studies: [
        {
          title: "Mama Caro's Kitchen",
          subtitle: "Local Restaurant, Lagos",
          image: "/service-images/case-study-mama-caro.png",
          results: "500% increase in social media engagement",
        },
        {
          title: "Sique Threads Boutique",
          subtitle: "Online Fashion Store, Abuja",
          image: "/service-images/case-study-sique.png",
          results: "300% increase in social media sales",
        },
        {
          title: "Enervia Solutions",
          subtitle: "Renewable Energy Provider, Nationwide",
          image: "/service-images/case-study-enervia.png",
          results: "200% increase in social media leads",
        },
      ],
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "What Our Clients Say About Our Social Media Marketing Service",
      reviews: [
        {
          rating: 5,
          text: "Our social media was practically dead before working with them. Now we have thousands of engaged followers and our posts regularly go viral. The ROI has been incredible.",
          author: {
            name: "Adebayo K.",
            role: "Marketing Director",
            company: "Lagos Fashion Hub",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          rating: 5,
          text: "They transformed our social media presence completely. The content quality is outstanding and our engagement rates have increased by 400%. We're now seen as industry leaders.",
          author: {
            name: "Fatima S.",
            role: "Brand Manager",
            company: "Abuja Beauty Co",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          rating: 5,
          text: "The social media campaigns they run for us consistently deliver high-quality leads. Their understanding of the Nigerian market is exceptional.",
          author: {
            name: "Chidi O.",
            role: "CEO",
            company: "Tech Solutions NG",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
      ],
    },
    faq: {
      title: "FAQs",
      subtitle:
        "Get quick solutions to popular questions in our FAQ, giving you essential info at a glance.",
      image: "/service-images/faq-image.png",
      questions: [
        {
          question: "Which social media platforms should my business be on?",
          answer:
            "It depends on your target audience and business type. Instagram and Facebook are great for most businesses in Nigeria, while LinkedIn works well for B2B companies. We'll help you identify the right platforms during our audit.",
        },
        {
          question: "How often should I post on social media?",
          answer:
            "Consistency is more important than frequency. We typically recommend 3-5 posts per week for most platforms, but this varies based on your audience and industry. Quality content that engages your audience is key.",
        },
        {
          question: "Do you create all the content or do I need to provide it?",
          answer:
            "We handle all content creation including graphics, captions, and video content. However, we may occasionally ask for product photos or specific information about your business to ensure authenticity.",
        },
        {
          question: "How do you measure social media success?",
          answer:
            "We track various metrics including engagement rates, follower growth, reach, website traffic from social media, and most importantly, leads and conversions generated from your social media efforts.",
        },
        {
          question: "Can you help with social media advertising?",
          answer:
            "Yes! Our Standard and Premium packages include paid social media advertising with dedicated ad spend. We create targeted campaigns to reach your ideal customers and maximize your ROI.",
        },
      ],
    },
  },
};

export function getServiceDetail(serviceId: string): ServiceDetail | null {
  return SERVICE_DETAILS[serviceId] || null;
}

export function getAllServiceIds(): string[] {
  return Object.keys(SERVICE_DETAILS);
}
