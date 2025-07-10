class ArticlesController < ApplicationController
    before_action :set_article, only: [:show]
    before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]

    def index
        @articles = Article.all
    end

    def show
    end

    def new
        @article = current_user.articles.build
    end

    def create
        @article = current_user.articles.build(article_params)
        if @article.save # 保存したら、その作成したページに飛ぶ
            redirect_to article_path(@article), notice: I18n.t('flash.articles.create.success')
        else # 保存されなかった時、フォームを再表示
            flash.now[:error] = I18n.t('flash.articles.create.failure')
            render :new, status: :unprocessable_entity
        end
    end

    def edit
        @article = current_user.articles.find(params[:id])
    end

    def update
        @article = current_user.articles.find(params[:id])
        if @article.update(article_params)
            redirect_to article_path(@article), notice: I18n.t('flash.articles.update.success')
        else
            flash.now[:error] = I18n.t('flash.articles.update.failure')
            render :edit, status: :unprocessable_entity
        end
    end

    def destroy
        article = current_user.articles.find(params[:id])
        article.destroy!
        redirect_to root_path, status: :see_other, notice: I18n.t('flash.articles.destroy.success')
    end

    private
    def article_params
        params.require(:article).permit(:title, :content, :eyecatch)
    end

    def set_article
        @article = Article.find(params[:id])
    end

end
