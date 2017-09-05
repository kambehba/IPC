using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace InternetControl
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        static System.Windows.Threading.DispatcherTimer mainTimer;
        private SerialPort myport;

        public MainWindow()
        {
            InitializeComponent();
            InitializeSerialPort();
            mainTimer = new System.Windows.Threading.DispatcherTimer();
            mainTimer.Tick += new EventHandler(OnTimedEvent);
            mainTimer.Interval = TimeSpan.FromSeconds(1);
            light.Background = Brushes.Red;
            lightstatus.Content = "OFF";
            mainTimer.Start();//fghgfhfdgewrtwerttew
        }

        private void Start_Click(object sender, RoutedEventArgs e)
        {
             mainTimer.Start();

            myport.WriteLine("ON");

        }

        private void Stop_Click(object sender, RoutedEventArgs e)
        {
               mainTimer.Stop();
            myport.WriteLine("OFF");


        }

        private void InitializeSerialPort()
        {
            myport = new SerialPort();
            myport.BaudRate = 9600;
            myport.PortName = "COM5";
            myport.Open();
        }


        private void OnTimedEvent(object source, EventArgs e)
        {
            //var request = (HttpWebRequest)WebRequest.Create("http://localhost:3000/api/outputs");
            var request = (HttpWebRequest)WebRequest.Create("https://ipc-webserver.herokuapp.com/api/outputs");
            
            var response = (HttpWebResponse)request.GetResponse();

            
            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            var g = responseString.Split('"');
            
            if(g[9] == "ON")
            {

                light.Background = Brushes.Green;
                lightstatus.Content = "ON";
                myport.WriteLine("ON");
            }

            if (g[9] == "OFF")
            {

                light.Background = Brushes.Red;
                lightstatus.Content = "OFF";
                myport.WriteLine("OFF");
            }
          
            
        }
    }
}
