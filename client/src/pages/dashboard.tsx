import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Headphones, 
  Video, 
  Calendar,
  Save,
  Upload,
  Eye
} from "lucide-react";
import { supabaseApi, type SupabaseArticle, type SupabaseAudioContent, type SupabaseVideo, type SupabaseSchedule } from "@/lib/supabase";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("articles");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries for each content type
  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['dashboard-articles'],
    queryFn: supabaseApi.getArticles,
    enabled: activeTab === 'articles'
  });

  const { data: audioContent, isLoading: audioLoading } = useQuery({
    queryKey: ['dashboard-audio'],
    queryFn: supabaseApi.getAudioContent,
    enabled: activeTab === 'audio'
  });

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ['dashboard-videos'],
    queryFn: supabaseApi.getVideos,
    enabled: activeTab === 'videos'
  });

  const { data: schedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['dashboard-schedules'],
    queryFn: supabaseApi.getSchedules,
    enabled: activeTab === 'schedules'
  });

  // Create mutations
  const createArticleMutation = useMutation({
    mutationFn: supabaseApi.createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-articles'] });
      setIsCreateModalOpen(false);
      toast({ title: "Makala imeongezwa", description: "Makala mpya imeongezwa kikamilifu" });
    },
    onError: () => {
      toast({ title: "Hitilafu", description: "Imeshindwa kuongeza makala", variant: "destructive" });
    }
  });

  const createAudioMutation = useMutation({
    mutationFn: supabaseApi.createAudioContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-audio'] });
      setIsCreateModalOpen(false);
      toast({ title: "Sauti imeongezwa", description: "Mafunzo ya sauti yameongezwa kikamilifu" });
    },
    onError: () => {
      toast({ title: "Hitilafu", description: "Imeshindwa kuongeza sauti", variant: "destructive" });
    }
  });

  const createVideoMutation = useMutation({
    mutationFn: supabaseApi.createVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-videos'] });
      setIsCreateModalOpen(false);
      toast({ title: "Video imeongezwa", description: "Video mpya imeongezwa kikamilifu" });
    },
    onError: () => {
      toast({ title: "Hitilafu", description: "Imeshindwa kuongeza video", variant: "destructive" });
    }
  });

  const createScheduleMutation = useMutation({
    mutationFn: supabaseApi.createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-schedules'] });
      setIsCreateModalOpen(false);
      toast({ title: "Ratiba imeongezwa", description: "Ratiba mpya imeongezwa kikamilifu" });
    },
    onError: () => {
      toast({ title: "Hitilafu", description: "Imeshindwa kuongeza ratiba", variant: "destructive" });
    }
  });

  // Delete mutations
  const deleteArticleMutation = useMutation({
    mutationFn: supabaseApi.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-articles'] });
      toast({ title: "Makala imefutwa", description: "Makala imefutwa kikamilifu" });
    }
  });

  const deleteAudioMutation = useMutation({
    mutationFn: supabaseApi.deleteAudioContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-audio'] });
      toast({ title: "Sauti imefutwa", description: "Mafunzo ya sauti yamefutwa kikamilifu" });
    }
  });

  const deleteVideoMutation = useMutation({
    mutationFn: supabaseApi.deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-videos'] });
      toast({ title: "Video imefutwa", description: "Video imefutwa kikamilifu" });
    }
  });

  const deleteScheduleMutation = useMutation({
    mutationFn: supabaseApi.deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-schedules'] });
      toast({ title: "Ratiba imefutwa", description: "Ratiba imefutwa kikamilifu" });
    }
  });

  const handleCreate = (type: string) => {
    setActiveTab(type);
    setEditingItem(null);
    setIsCreateModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm("Una uhakika unataka kufuta?")) return;
    
    switch (type) {
      case 'articles':
        deleteArticleMutation.mutate(id);
        break;
      case 'audio':
        deleteAudioMutation.mutate(id);
        break;
      case 'videos':
        deleteVideoMutation.mutate(id);
        break;
      case 'schedules':
        deleteScheduleMutation.mutate(id);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-islamic-green font-playfair">Dashboard ya Maudhui</h1>
              <p className="text-gray-600">Dhibiti maudhui yote ya tovuti</p>
            </div>
            <Button 
              onClick={() => window.open('/', '_blank')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ona Tovuti
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Makala
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              Sauti
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="schedules" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Ratiba
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Makala</h2>
              <Button onClick={() => handleCreate('articles')} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ongeza Makala
              </Button>
            </div>
            
            {articlesLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {articles?.map((article) => (
                  <Card key={article.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-islamic-green">{article.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{article.excerpt}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="secondary">{article.category}</Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(article.published_at).toLocaleDateString('sw-KE')}
                            </span>
                            <span className="text-xs text-gray-500">{article.reading_time} dakika</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(article)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete('articles', article.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Mafunzo ya Sauti</h2>
              <Button onClick={() => handleCreate('audio')} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ongeza Sauti
              </Button>
            </div>
            
            {audioLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {audioContent?.map((audio) => (
                  <Card key={audio.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img 
                            src={audio.cover_image} 
                            alt={audio.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-islamic-green">{audio.title}</h3>
                            <p className="text-gray-600 text-sm">{audio.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">{audio.duration}</span>
                              {audio.is_currently_playing && (
                                <Badge className="bg-green-100 text-green-800">Inacheza sasa</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(audio)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete('audio', audio.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Video</h2>
              <Button onClick={() => handleCreate('videos')} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ongeza Video
              </Button>
            </div>
            
            {videosLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {videos?.map((video) => (
                  <Card key={video.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img 
                            src={`https://img.youtube.com/vi/${video.youtube_id}/default.jpg`}
                            alt={video.title}
                            className="w-16 h-12 rounded object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-islamic-green">{video.title}</h3>
                            <p className="text-gray-600 text-sm">{video.description}</p>
                            <span className="text-xs text-gray-500">{video.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(video)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete('videos', video.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Schedules Tab */}
          <TabsContent value="schedules">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Ratiba za Darsa</h2>
              <Button onClick={() => handleCreate('schedules')} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ongeza Ratiba
              </Button>
            </div>
            
            {schedulesLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {schedules?.map((schedule) => (
                  <Card key={schedule.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-islamic-green">{schedule.mosque_name}</h3>
                          <p className="text-gray-600">{schedule.subject} - {schedule.teacher}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-500">{schedule.day_of_week}</span>
                            <span className="text-sm text-gray-500">{schedule.time_slot}</span>
                            <Badge variant={schedule.is_active ? "default" : "secondary"}>
                              {schedule.is_active ? "Inatumika" : "Haijatumika"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(schedule)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete('schedules', schedule.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create/Edit Modal */}
      <CreateEditModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        type={activeTab}
        editingItem={editingItem}
        onSubmit={(data) => {
          switch (activeTab) {
            case 'articles':
              createArticleMutation.mutate(data);
              break;
            case 'audio':
              createAudioMutation.mutate(data);
              break;
            case 'videos':
              createVideoMutation.mutate(data);
              break;
            case 'schedules':
              createScheduleMutation.mutate(data);
              break;
          }
        }}
      />
    </div>
  );
}

// Create/Edit Modal Component
function CreateEditModal({ 
  isOpen, 
  onClose, 
  type, 
  editingItem, 
  onSubmit 
}: {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  editingItem: any;
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Hariri' : 'Ongeza'} {
              type === 'articles' ? 'Makala' :
              type === 'audio' ? 'Sauti' :
              type === 'videos' ? 'Video' : 'Ratiba'
            }
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'articles' && (
            <>
              <div>
                <Label htmlFor="title">Kichwa</Label>
                <Input 
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Muhtasari</Label>
                <Textarea 
                  id="excerpt"
                  value={formData.excerpt || ''}
                  onChange={(e) => updateFormData('excerpt', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Maudhui</Label>
                <Textarea 
                  id="content"
                  value={formData.content || ''}
                  onChange={(e) => updateFormData('content', e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Jamii</Label>
                <Select value={formData.category || ''} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chagua jamii" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Akidah">Akidah</SelectItem>
                    <SelectItem value="Fiqh">Fiqh</SelectItem>
                    <SelectItem value="Maadili">Maadili</SelectItem>
                    <SelectItem value="Tarehe">Tarehe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cover_image">Picha ya Jalada</Label>
                <Input 
                  id="cover_image"
                  value={formData.cover_image || ''}
                  onChange={(e) => updateFormData('cover_image', e.target.value)}
                  placeholder="URL ya picha"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reading_time">Muda wa Kusoma (dakika)</Label>
                <Input 
                  id="reading_time"
                  type="number"
                  value={formData.reading_time || ''}
                  onChange={(e) => updateFormData('reading_time', parseInt(e.target.value))}
                  required
                />
              </div>
            </>
          )}

          {type === 'audio' && (
            <>
              <div>
                <Label htmlFor="title">Kichwa</Label>
                <Input 
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Maelezo</Label>
                <Textarea 
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="audio_url">URL ya Sauti</Label>
                <Input 
                  id="audio_url"
                  value={formData.audio_url || ''}
                  onChange={(e) => updateFormData('audio_url', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cover_image">Picha ya Jalada</Label>
                <Input 
                  id="cover_image"
                  value={formData.cover_image || ''}
                  onChange={(e) => updateFormData('cover_image', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Muda</Label>
                <Input 
                  id="duration"
                  value={formData.duration || ''}
                  onChange={(e) => updateFormData('duration', e.target.value)}
                  placeholder="mm:ss"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is_currently_playing"
                  checked={formData.is_currently_playing || false}
                  onCheckedChange={(checked) => updateFormData('is_currently_playing', checked)}
                />
                <Label htmlFor="is_currently_playing">Inacheza sasa</Label>
              </div>
            </>
          )}

          {type === 'videos' && (
            <>
              <div>
                <Label htmlFor="title">Kichwa</Label>
                <Input 
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Maelezo</Label>
                <Textarea 
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="youtube_id">YouTube ID</Label>
                <Input 
                  id="youtube_id"
                  value={formData.youtube_id || ''}
                  onChange={(e) => updateFormData('youtube_id', e.target.value)}
                  placeholder="dQw4w9WgXcQ"
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Muda</Label>
                <Input 
                  id="duration"
                  value={formData.duration || ''}
                  onChange={(e) => updateFormData('duration', e.target.value)}
                  placeholder="hh:mm:ss"
                  required
                />
              </div>
            </>
          )}

          {type === 'schedules' && (
            <>
              <div>
                <Label htmlFor="mosque_name">Jina la Msikiti</Label>
                <Input 
                  id="mosque_name"
                  value={formData.mosque_name || ''}
                  onChange={(e) => updateFormData('mosque_name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mosque_location">Mahali</Label>
                <Input 
                  id="mosque_location"
                  value={formData.mosque_location || ''}
                  onChange={(e) => updateFormData('mosque_location', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="day_of_week">Siku</Label>
                <Select value={formData.day_of_week || ''} onValueChange={(value) => updateFormData('day_of_week', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chagua siku" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jumamosi">Jumamosi</SelectItem>
                    <SelectItem value="Jumapili">Jumapili</SelectItem>
                    <SelectItem value="Jumatatu">Jumatatu</SelectItem>
                    <SelectItem value="Jumanne">Jumanne</SelectItem>
                    <SelectItem value="Jumatano">Jumatano</SelectItem>
                    <SelectItem value="Alhamisi">Alhamisi</SelectItem>
                    <SelectItem value="Ijumaa">Ijumaa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time_slot">Muda</Label>
                <Input 
                  id="time_slot"
                  value={formData.time_slot || ''}
                  onChange={(e) => updateFormData('time_slot', e.target.value)}
                  placeholder="Baada Ya Magharibi"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Somo</Label>
                <Input 
                  id="subject"
                  value={formData.subject || ''}
                  onChange={(e) => updateFormData('subject', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="teacher">Mwalimu</Label>
                <Input 
                  id="teacher"
                  value={formData.teacher || ''}
                  onChange={(e) => updateFormData('teacher', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="additional_info">Maelezo ya Ziada</Label>
                <Input 
                  id="additional_info"
                  value={formData.additional_info || ''}
                  onChange={(e) => updateFormData('additional_info', e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="is_active"
                  checked={formData.is_active || false}
                  onCheckedChange={(checked) => updateFormData('is_active', checked)}
                />
                <Label htmlFor="is_active">Inatumika</Label>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Ghairi
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {editingItem ? 'Hifadhi Mabadiliko' : 'Ongeza'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}