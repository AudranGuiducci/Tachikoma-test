(ns tashikoma-form.components.inputs
  (:require
   [re-frame.core :as re-frame]
   [tashikoma-form.events :as events]
   [tashikoma-form.subs :as subs]))

(defn text-input [id label]
  (let [value (re-frame/subscribe [::subs/form id])]
    [:div.field
     [:label.label label]
     [:div.control
      [:input.input {:value @value
                     :on-change #(re-frame/dispatch [::events/update-form id (-> % .-target .-value)])
                     :type "text" :placeholder "Text Input"}]]]))

(defn email-input [id label]
  (let [value (re-frame/subscribe [::subs/form id])]
    [:div.field
     [:label.label label]
     [:div.control.has-icons-left.has-icons-right
      [:input.input {:value @value
                     :on-change #(re-frame/dispatch [::events/update-form id (-> % .-target .-value)])
                     :type "email" :placeholder "Email input"}]
      [:span.icon.is-small.is-left
       [:i.fas.fa-envelope]]
      [:span.icon.is-small.is-right
       [:i.fas.fa-exclamation-triangle]]]
     (if @value
       (if (not (re-matches #".+\@.+\..+" @value))
         [:p.help.is-danger "This email is invalid"]))]))