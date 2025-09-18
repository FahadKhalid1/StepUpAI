import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, ArrowLeft, Plus, X, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BlogWriter: React.FC = () => {
  const [post, setPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    tags: [] as string[],
    featured: false
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const handleAddTag = () => {
    if (currentTag.trim() && !post.tags.includes(currentTag.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log('Saving post:', post);
    alert('Post saved successfully!');
  };

  const handlePublish = () => {
    // In a real app, this would publish to the blog
    console.log('Publishing post:', post);
    alert('Post published successfully!');
  };

  return (
    <>
      <SEO
        title="Write New Blog Post | Stepup AI"
        description="Create and publish new blog posts about AI automation and business intelligence."
        canonical="/blog/write"
      />
      
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to="/blog"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Blog</span>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Write New Post</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <Eye className="w-5 h-5" />
                  <span>{isPreview ? 'Edit' : 'Preview'}</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handlePublish}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <span>Publish</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isPreview ? (
            // Preview Mode
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-64 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                {post.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{post.author || 'Author Name'}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {post.title || 'Your Blog Post Title'}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6">
                  {post.excerpt || 'Your blog post excerpt will appear here...'}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="prose max-w-none">
                  {post.content ? (
                    <div className="whitespace-pre-wrap">
                      {post.content}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Your blog content will appear here...</p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            // Edit Mode
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Title */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter your blog post title..."
                    className="w-full text-2xl font-bold border-none focus:ring-0 focus:outline-none placeholder-gray-400"
                  />
                </div>

                {/* Excerpt */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={post.excerpt}
                    onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of your post..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Content */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={post.content}
                    onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your blog post content here..."
                    rows={20}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: You can use markdown syntax for formatting
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Post Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        value={post.author}
                        onChange={(e) => setPost(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={post.featured}
                          onChange={(e) => setPost(prev => ({ ...prev, featured: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Featured Post</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                          placeholder="Add a tag"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={handleAddTag}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          <Hash className="w-3 h-3" />
                          <span>{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Writing Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Keep your title clear and engaging</li>
                    <li>• Write a compelling excerpt to hook readers</li>
                    <li>• Use relevant tags for better discoverability</li>
                    <li>• Preview your post before publishing</li>
                    <li>• Save drafts frequently</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogWriter;