import { createContext, useContext, useState, ReactNode } from 'react';

export interface PostDraft {
  id: string;
  content: string;
  platforms: string[];
  scheduledFor?: Date;
  scheduledTime?: string;
  status: 'draft' | 'scheduled';
  createdAt: Date;
}

interface EditorContextType {
  posts: PostDraft[];
  activePostId: string | null;
  setActivePostId: (id: string | null) => void;
  addPost: (content?: string) => string;
  updatePost: (id: string, updates: Partial<PostDraft>) => void;
  deletePost: (id: string) => void;
  getActivePost: () => PostDraft | undefined;
  sendToEditor: (content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const initialPosts: PostDraft[] = [
  {
    id: '1',
    content: '<p>Excited to share our latest product update! 🚀 Check out the new features we have been working on for the past month.</p>',
    platforms: ['twitter', 'linkedin'],
    scheduledFor: new Date('2024-01-15'),
    scheduledTime: '10:00',
    status: 'scheduled',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    content: '<p>Just published a new blog post about productivity tips for remote teams. Read more on our website!</p>',
    platforms: ['linkedin'],
    scheduledFor: new Date('2024-01-15'),
    scheduledTime: '14:00',
    status: 'scheduled',
    createdAt: new Date('2024-01-11'),
  },
  {
    id: '3',
    content: '<p>Monday motivation: The only way to do great work is to love what you do. ✨</p>',
    platforms: ['twitter'],
    status: 'draft',
    createdAt: new Date('2024-01-12'),
  },
];

export function EditorProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<PostDraft[]>(initialPosts);
  const [activePostId, setActivePostId] = useState<string | null>(initialPosts[0]?.id || null);

  const addPost = (content: string = '') => {
    const newId = Date.now().toString();
    const newPost: PostDraft = {
      id: newId,
      content,
      platforms: ['twitter', 'linkedin'],
      status: 'draft',
      createdAt: new Date(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setActivePostId(newId);
    return newId;
  };

  const updatePost = (id: string, updates: Partial<PostDraft>) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => {
      const filtered = prev.filter((post) => post.id !== id);
      if (activePostId === id && filtered.length > 0) {
        setActivePostId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActivePostId(null);
      }
      return filtered;
    });
  };

  const getActivePost = () => posts.find((post) => post.id === activePostId);

  const sendToEditor = (content: string) => {
    const newId = addPost(content);
    setActivePostId(newId);
  };

  return (
    <EditorContext.Provider
      value={{
        posts,
        activePostId,
        setActivePostId,
        addPost,
        updatePost,
        deletePost,
        getActivePost,
        sendToEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
