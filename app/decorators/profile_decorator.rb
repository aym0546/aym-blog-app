module ProfileDecorator
  def age
    return I18n.t('profile.display.age') unless birthday.present?
    years = Time.zone.now.year - birthday.year
    days = Time.zone.now.yday - birthday.yday

    if days < 0
      "#{years -1}"
    else
      "#{years}"
    end
  end
end
