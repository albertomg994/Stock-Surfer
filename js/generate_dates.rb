require 'date'

initial_date = Date.parse("01-01-2012")
current_date = initial_date

number_of_years = 4
number_of_days = number_of_years*360

print "["

number_of_days.times do
  current_date += 1
  day = current_date.strftime("%d")
  day.sub!(/^[0]+/,'') # remove leftmost accumulated zeroes
  month = current_date.strftime("%B")
  if (month.length > 3)
    month = month[0,3]
  end
  year = current_date.strftime("%Y")
  
  
  print "\"" + day + " " + month + " " + year + "\","
end

print "]"
