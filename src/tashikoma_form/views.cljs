(ns tashikoma-form.views
  (:require
   [re-frame.core :as re-frame]
   [tashikoma-form.events :as events]
   [tashikoma-form.subs :as subs]
   [tashikoma-form.components.inputs :as inputs]))


(defn main-panel []
    (let [is-valid? @(re-frame/subscribe [::subs/form-is-valid? [:phone :email]])]

      [:div.section
       [:div
        [:h2 "Welcome"]
        [inputs/text-input :phone]
        [inputs/email-input :email]
        [:button.button.is-primary {:disabled (not is-valid?)
                                    :on-click #(re-frame/dispatch [::events/save-form])} "Save"]]]))
