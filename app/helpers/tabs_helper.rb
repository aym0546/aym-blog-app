module TabsHelper
  def add_active_class(path)
    # Rails 6/7 では current_page? がクエリ付きURLに対応していないため、パス部分だけで比較
    # path = path.split('?').first
    'active' if current_page?(path)
  end
end
